import { Passenger } from './../models/passenger.model';
import { GetFlightsService } from './../services/get-flights.service';
import { CookieService } from 'ngx-cookie-service';
import { BookingView } from './../models/bookings-view';
import { BookingconfirmationComponent } from './../bookingconfirmation/bookingconfirmation.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassengerView } from '../models/passenger-view.model';

@Component({
  selector: 'app-viewbookings',
  templateUrl: './viewbookings.component.html',
  styleUrls: ['./viewbookings.component.css']
})
export class ViewbookingsComponent implements OnInit {

  bookingsView: BookingView[];
  userEmail: string;
  passengersNo:number=10;
  expandPsngrDetails: boolean[] = new Array(this.passengersNo).fill(false);
  psngrCount:number;
  index:number = 0;

  passengers: Passenger[];
  psngrView: PassengerView[][]=[];
  constructor(private cookies: CookieService,
    private getFlightsService: GetFlightsService,
    private router:Router) { }

  ngOnInit(): void {

    this.showBookings()
  }

  expandModifyDetails(i:number)
  {
    //get passengers length !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.psngrCount = 2
    this.expandPsngrDetails[i]= !this.expandPsngrDetails[i]
    console.log(this.expandPsngrDetails)
  }
/*
  fillPassengers()
  {
    for(let booking of this.bookingsView)
    {
      this.psngrView.push(booking.passengers)
      for(let  psngr of booking.passengers)
      {
        let p: Passenger = 
        {
          id:psngr.Id,
          name: psngr.name,
          gender: 
        }
          this.passengers.push(p)        
        }
      
      console.log(this.psngrView)      
    }
  }
  */

  cancelBooking(index:number)
  {
    let bookingId= this.bookingsView[index].bookingId 
    this.getFlightsService.cancelBooking(bookingId).subscribe(
      {
        next:(response)=>
        {
          console.log(response)
          alert("Your booking has been cancelled")
        },
        error:(response)=>
        {
          console.log(response)
        }
      }
    )
  }

  isCancelled(index:number)
  {
    if(this.bookingsView[index].passengers[0].status==="Cancelled")
    {
      return true
    }
    return false
  }
  showBookings() {
    //we get the useremail from cookies and pass that as the paramter to find bookings.
    this.userEmail = this.cookies.get("loggedEmail");console.log(this.userEmail)

    // get bookings for current active email ID
    this.getFlightsService.getMyBooking(this.userEmail).subscribe(
      {
        next: (bookingsView) => {
          this.bookingsView = bookingsView,
            console.log(this.bookingsView)
        },
        error: (response) => { console.log(response) }
      }
    )
  }

}
