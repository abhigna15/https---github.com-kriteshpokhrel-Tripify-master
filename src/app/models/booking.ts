import { Passenger } from './passenger.model';
export interface Booking
{
    name:string;
    email:string;
    phoneNo:string;
    tripIds:number[];
    passengers: Passenger[];
}