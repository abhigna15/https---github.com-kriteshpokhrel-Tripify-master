import { Router } from '@angular/router';
import { Booking } from './../models/booking';
import { FlightQuery } from './../models/flight-query.model';
import { FlightAvailable } from './../models/flights-available.model';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Passenger } from '../models/passenger.model';
import { GetFlightsService } from './../services/get-flights.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { ParseError } from '@angular/compiler';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(private cookie: CookieService,
    private getFlightsService: GetFlightsService,
    private router: Router,private loginAuth:AuthService

  ) { }
  booking: Booking;
  ngOnInit(): void {
    //update UI with selected flight
    this.flightAvailable = JSON.parse(this.cookie.get("selectedFlight"));
    console.log(this.flightAvailable);
    this.flightQuery = JSON.parse(this.cookie.get("queryDetails"));
    this.passengers = this.flightQuery.passengerCount;
    this.passengersDetails = Array.from(Array(this.passengers), () => ({ name: '', age: 0, gender: 0 }))
    console.log(this.passengersDetails);


    //get flight id

    this.flightId = this.flightAvailable.id;
    //////INSERT USER NAME HERE FROM COOKIES OR ALTS
    this.cookie.set("user",this.loginAuth.currentUser.value);
    //this.user = "Adminbro";

  }

  ///after api from here

  flightQuery: FlightQuery;
  flightId: number;
  passengers: number;
  passengersDetails: Passenger[] ;
  
  //userdetails
  userEmail: string;
  userContact: number;
  user: string;

  flightAvailable: FlightAvailable;

  bookTickets() {
    //create bookings type object here

    this.cookie.set("tripId",this.flightId.toString());
    let passengersDetailsArr = JSON.stringify(this.passengersDetails);
    this.cookie.set("passengerDetails", passengersDetailsArr);
    console.log(this.cookie.get("passengerDetails") + " is wht we sent");
    this.router.navigate(['payment'])
  }

}
