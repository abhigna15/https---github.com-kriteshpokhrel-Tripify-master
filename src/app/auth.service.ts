import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient,private cookieService:CookieService) { }
  
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  baseApiUrl = "http://localhost:5054/api";

  jwtHelperService = new JwtHelperService();

  registerUser(user : Array<string>){
    return this.http.post(this.baseApiUrl+"/UserLoginRegistration/Register",
    {
     UserName:user[0],
     EmailID:user[1],
     Password:user[2]
    },
    {
     responseType:'text',
    });
   }
   loginUser(loginInf : Array<String>){
    return this.http.post(this.baseApiUrl+"/UserLoginRegistration/Login",{
      EmailID:loginInf[0],
      Password:loginInf[1]
    },{
      responseType:'text',
    });
  }
 setToken(token: string){
    localStorage.setItem("access_token",token);
    this.lodCurrentUser();
  }

  lodCurrentUser(){
      const token = localStorage.getItem("access_token");
      const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
      const data = userInfo ?{
        ID : userInfo.ID,
        EmailID : userInfo.EmailID
      }:null;
      this.currentUser.next(data);
  }

  isLoggedin(): boolean{
    if(localStorage.getItem("access_token") && this.currentUser !=null){
      return true;
    }
    return false;
  }

  deleteCookie(){
    this.cookieService.delete('Cookie');
  }
   
  removeToken(){
    localStorage.removeItem("access_token");
  }
}
