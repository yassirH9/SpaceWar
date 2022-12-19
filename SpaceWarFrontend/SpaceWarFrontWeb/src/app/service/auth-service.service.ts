import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../models/ILogin';
import { ILoginResponse } from '../models/ILoginResponse';
import { IRegister } from '../models/IRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  enpoint:string="localhost:8080/";
  constructor(private http: HttpClient) { }

  login(userdata: ILogin){
    return this.http.post<ILoginResponse>("/api/auth/signin",userdata);
  }
  register(userdata:IRegister){
    return this.http.post<any>("/api/auth/signup",userdata);
  }
}
