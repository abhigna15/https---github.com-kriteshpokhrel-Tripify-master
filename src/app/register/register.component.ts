import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  displayMsg: string = "";
  isAccountCreated: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {  }
  registerForm = new FormGroup({
    UserName : new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    EmailID : new FormControl("",[Validators.required,Validators.email]),
    Password : new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)])
  });

registerSubmitted(){

  if(this.Password.value){
    console.log(this.registerForm.valid);
    
  this.authService.registerUser([
    this.registerForm.value.UserName!,
    this.registerForm.value.EmailID!,
    this.registerForm.value.Password!
  ]).subscribe((res)=>{
    if(res == 'Success'){
      this.displayMsg = "Account created successfully";
      console.log(this.registerForm.value.Password);
      this.isAccountCreated = true;
    }
    else if(res == 'AlreadyExist'){
      this.displayMsg = "Account exists";
      this.isAccountCreated = false;
    }
    else{
      this.displayMsg = "Something went wrong";
      this.isAccountCreated = false;
    }
  })
  }
  else{
    console.log("Blah");
  }
}
get UserName() : FormControl{
  return this.registerForm.get("UserName") as FormControl;
}
get EmailID() : FormControl{
  return this.registerForm.get("EmailID") as FormControl;
}
get Password() : FormControl{
  return this.registerForm.get("Password") as FormControl;
}

}
