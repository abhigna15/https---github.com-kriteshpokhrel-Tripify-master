import { Router } from '@angular/router';
import { routingComponents } from './../app-routing.module';
import { FlightsAvailable, FlightAvailable } from './../models/flights-available.model';
import { GetFlightsService } from './../services/get-flights.service';
import { FlightQuery } from './../models/flight-query.model';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {

  constructor(private cookie: CookieService,
    private getFlightsService: GetFlightsService,
    private router: Router
  ) { }

  flightQuery: FlightQuery = JSON.parse(this.cookie.get("queryDetails"))
  flightsAvailable: FlightAvailable[]

  //show results for non-stop flights 
  showResults() {
    //code to get flights from cookies
    this.getFlightsService.getFlights(this.flightQuery).subscribe(
      {
        next: (flightsAvailable) => {
          this.flightsAvailable = flightsAvailable
          console.log(this.flightsAvailable)
        },
        error: (response) => { console.log(response) }
      }
    )

    console.log(this.flightsAvailable)
  }
  ngOnInit(): void {
    //call function to add results to UI
    this.showResults();
  }

  bookTicket(event: Event) {
    let elementId: number = parseInt((event.target as Element).id)
    let flightData: string = JSON.stringify(this.flightsAvailable[elementId]);
    //add current to cookies
    this.cookie.set("selectedFlight", flightData);
    this.router.navigate(['../booking']);
  }


  seeQuery() {
    if (this.flightQuery.sourceId === 0 || this.flightQuery.destinationId === 0 || this.flightQuery.sourceTime === new Date("1992-12-31") ||this.flightQuery.passengerCount===0) {
      alert("Please select all fields")
    }
    else  if (this.flightQuery.sourceId === this.flightQuery.destinationId) {
      alert("Source and destination cannot be same.")
    }
    else {
      this.cookie.set("queryDetails", JSON.stringify(this.flightQuery))
      this.showResults();
    }
  }
}
