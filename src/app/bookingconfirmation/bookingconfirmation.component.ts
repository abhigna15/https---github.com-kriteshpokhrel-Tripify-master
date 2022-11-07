import { Passenger } from './../models/passenger.model';
import { Component, OnInit } from '@angular/core';
import { Booking } from './../models/booking';
import { GetFlightsService } from './../services/get-flights.service';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-bookingconfirmation',
  templateUrl: './bookingconfirmation.component.html',
  styleUrls: ['./bookingconfirmation.component.css']
})
export class BookingconfirmationComponent implements OnInit {
  booking:Booking;
  userName:string;
  userEmail:string;
userContact:string;
  tripId:number[]=[];   
  id:Number;

  passengersDetails: Passenger[];
  constructor(private cookie: CookieService,
    private getFlightsService: GetFlightsService,
    private router:Router,private loginAuth:AuthService) { }

  ngOnInit(): void {
    this.performBooking();
  }

  performBooking()
  {
    this.userName= this.cookie.get("userName");
    this.userEmail = this.cookie.get("loggedEmail");    
    this.userContact = this.cookie.get("userContact");
    let id = parseInt(this.cookie.get("tripId"))
    console.log(id.toString()+ " is the flight id.")
    this.tripId[0]=id;
    this.passengersDetails = JSON.parse(this.cookie.get("passengerDetails"));
    this.booking = {
      //as logged in user and email
      name: this.userName,
      email: this.userEmail,
      phoneNo: this.userContact,
      tripIds: this.tripId,
      passengers: this.passengersDetails
    }; 
    console.log(this.booking+" is what we received")
    this.getFlightsService.confirmBooking(this.booking).subscribe(
      {
        next: (response) => { 

          alert("Ticket booked")
        },
        error: (response) => { alert("No seats are available for your selected flight.")
        console.log(response)
      //this.router.navigate(['payment']) 
    }
      }
    )
  }
}
