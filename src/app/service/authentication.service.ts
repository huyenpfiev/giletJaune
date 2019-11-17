import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails {
  _id:string;
  FirstName: string;
  LastName: string;  
  Age:number,
  Family:string,
  Role:string
}

interface TokenResponse {
  token: string;
}



@Injectable()
export class AuthenticationService {
  private token: string
  uri = 'http://localhost:4000/infos';
  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  public register(FirstName,LastName,Age,Family,Role,Username,Password) {
    const obj = {
      FirstName,
      LastName,
      Age,
      Family,
      Role,
      Username,
      Password
    };
    
    return this.http.post(`${this.uri}/register`, obj);    
  }

  public login(Username,Password){

    const obj={
          Username,Password
      };
    const base = this.http.post(`${this.uri}/login`,obj);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    )

    return request;
  }

  public getInfos(): Observable<any> {
    return this.http.get(`${this.uri}/getInfos`, {
      headers: { Authorization: ` ${this.getToken()}` }
    });
  }
  public update(FirstName,LastName,Age,Family,Role){
    const obj = {
      FirstName,
      LastName,
      Age,
      Family,
      Role
    };
    return this.http.post(`${this.uri}/update`, obj,{
      headers: { Authorization: ` ${this.getToken()}` }
    });
  }
  public getFriends(){
    return this.http.get(`${this.uri}/getFriends`,{
      headers: { Authorization: ` ${this.getToken()}` }
    });
  }
  public deleteFriend(id){
    const obj={
      _id:id
    }
    return this.http.post(`${this.uri}/deleteFriend`,obj,{
      headers: { Authorization: ` ${this.getToken()}` }
    });
    
      
  }
  public getUnFriends(){
    return this.http.get(`${this.uri}/getUnFriends`,{
      headers: { Authorization: ` ${this.getToken()}` }
    });
  }
  public addFriend(id){
    const obj={
      _id:id
    }
    return this.http.post(`${this.uri}/addFriend`,obj,{
      headers: { Authorization: ` ${this.getToken()}` }
    });
      
  }
  

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('usertoken');
    this.router.navigate['login'];
  }
}