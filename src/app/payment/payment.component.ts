import { FlightAvailable } from './../models/flights-available.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  userName:string;
  userEmail:string;
  userContact:string;
  flightAvailable:FlightAvailable;
  
  constructor(private cookie:CookieService,
    private router:Router) { }
  ngOnInit(): void {
    this.flightAvailable = JSON.parse(this.cookie.get("selectedFlight"))
    console.log(this.flightAvailable);  
  }
  
  confirmBooking()
  {
    if(this.userEmail==='' || this.userName==='')
    {
      alert("Please enter all fields");
      console.log("Fields empty")
    }
    else{
      this.cookie.set("userName",this.userName);
      this.cookie.set("userEmail",this.userEmail);      
      this.cookie.set("userContact",this.userContact);
      console.log("Fields not empty"+ this.userName+this.userEmail+ this.userContact);
      this.router.navigate(['bookingConfirmation']);
    }
    }


}
