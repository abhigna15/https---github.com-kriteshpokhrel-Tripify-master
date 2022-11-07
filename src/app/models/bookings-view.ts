import { PassengerView } from './passenger-view.model';
import { Passenger } from './passenger.model';
export interface BookingView
{
    bookingId:number;
    name:string;
    email:string;
    phoneNo:string;
    dateTime:string;
    status:string;
    tripId:number;
    tripName:string;
    source:string;
    destination:string;
    passengers:PassengerView[];
}

