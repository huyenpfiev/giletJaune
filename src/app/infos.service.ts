import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfosService {

  uri = 'http://localhost:4000/infos';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  register(obj) {
    // const obj = {
    //   FirstName,
    //   LastName,
    //   Age,
    //   Family,
    //   Role,
    //   Username,
    //   Password
    // };
    console.log(obj);
    this.http.post(`${this.uri}/register`, obj).subscribe(res => console.log(res));
  }
}
