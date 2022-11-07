import { Booking } from './../models/booking';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightQuery } from '../models/flight-query.model';
import { FlightAvailable } from '../models/flights-available.model';
import { BookingView } from '../models/bookings-view';
@Injectable({
  providedIn: 'root'
})
export class GetFlightsService {

  constructor(private http:HttpClient) { } 
  baseApiUrl: string = environment.baseApiUrl;
  headers:HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbElEIjoiYWJoaWduYTExLjExQGdtYWlsLmNvbSIsIlBhc3N3b3JkIjoiMTIzNDU2IiwiZXhwIjoxNjY3NDYzMTU1LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwNTQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNTc0In0.rLHd4A6rvTsolzuhamKHudWDnUDq_uEee90WDJFeqa4'
  });

  getFlights(flightQuery: FlightQuery): Observable<FlightAvailable[]>
  {
    console.log(this.baseApiUrl+'/api/General/GetTrips/'+flightQuery.sourceId+"/"+flightQuery.destinationId+"/"+flightQuery.sourceTime+"/"+flightQuery.passengerCount);
   return  this.http.get<FlightAvailable[]>(this.baseApiUrl+'/api/General/GetTrips/'+flightQuery.sourceId+"/"+flightQuery.destinationId+"/"+flightQuery.sourceTime+"/"+flightQuery.passengerCount);
  }

  confirmBooking(booking:Booking):Observable<number>
  {
    console.log(booking);
    return this.http.post<number>(this.baseApiUrl+'/api/SeatBooking/BookSeats',booking,{headers: this.headers});
  }

  getMyBooking(email:string):Observable<BookingView[]>
  {
    console.log(email+" bookings are being displayed");
    return this.http.get<BookingView[]>(this.baseApiUrl+'/api/General/GetMyBookings/'+email,{headers: this.headers});
  }


  cancelBooking(index:number): Observable<Response>
{
  
  console.log("booking no." +index+" is getting deleted");
  return this.http.delete<Response>(this.baseApiUrl+'/api/SeatBooking/CancelBookings/'+index,{headers: this.headers});

}
}
