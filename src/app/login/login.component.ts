import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private cookie_name='';
private all_cookies:any='';

  constructor(private loginAuth:AuthService, private router:Router ,private cookieService:CookieService) { }

  ngOnInit(): void {
    this.cookie_name = this.cookieService.get('loggedEmail');
    this.all_cookies = this.cookieService.getAll();
  }
  
loginForm = new FormGroup({
  EmailID :new FormControl("",[Validators.required,Validators.email]),
  Password: new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)])
});

isValidUser:boolean=false;
loginSubmitted(){
  this.loginAuth.loginUser([this.loginForm.value.EmailID!,this.loginForm.value.Password!]).subscribe(res=>{
    if(res=='Failure'){
      this.isValidUser=false;
      alert("Login Unsuccessful");
    }
    else{
      this.isValidUser=true;
      this.loginAuth.setToken(res);
      console.log(this.loginAuth.currentUser.value);
      this.cookieService.set('loggedEmail',this.loginForm.value.EmailID!,5);
      this.router.navigateByUrl('');
    }
  });
}


get EmailID() : FormControl{
  return this.loginForm.get("EmailID") as FormControl;
}
get Password() : FormControl{
  return this.loginForm.get("Password") as FormControl;
}
}
