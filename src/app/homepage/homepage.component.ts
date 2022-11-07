import { FlightsAvailable, FlightAvailable } from './../models/flights-available.model';
import { FlightQuery } from './../models/flight-query.model';
import { GetFlightsService } from './../services/get-flights.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private router: Router,
    private cookie: CookieService,

  ) { }

  ngOnInit(): void {
    let date = new Date().toISOString().slice(0, 10);
  }

  handleMinus() {
    if (this.flightQuery.passengerCount > 1) this.flightQuery.passengerCount--;
  }
  handlePlus() {
    if (this.flightQuery.passengerCount < 9)this.flightQuery.passengerCount++;
  }

  ///////api starts here//////////// for later integration

  //create a flightQuery type
  flightQuery: FlightQuery =
    {
      sourceId: 0,
      destinationId: 0,
      sourceTime: new Date("0"),
      passengerCount: 1
    }
  //setting minimum flight
    minDate = new Date(new Date().getTime()).toISOString().substring(0,10);
  //search flight request
  //IMP------ add front end validation then ojn success create another method to store cookies
  searchFlights() {

    if (this.flightQuery.sourceId === 0 || this.flightQuery.destinationId === 0 || this.flightQuery.sourceTime == new Date("1992-12-31")) {
      alert("Please select all fields")
    }
    else if (this.flightQuery.sourceId === this.flightQuery.destinationId) {
      alert("Source and destination cannot be same.")
    }
    else {
      let flightQueryString = JSON.stringify(this.flightQuery);
      this.cookie.set("queryDetails", flightQueryString);
      console.log(this.cookie.get("queryDetails"));
      
      this.router.navigate(['searchresults']);
    }
  }
}

