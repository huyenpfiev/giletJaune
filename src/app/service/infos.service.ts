import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfosService {

  uri = 'http://localhost:4000/infos';

  constructor(private http: HttpClient) { }

  register(FirstName,LastName,Age,Family,Role,Username,Password) {
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
  login(Username,Password){
    const obj={
      Username,Password
    };
    return this.http.post(`${this.uri}/login`,obj);
  }
}
