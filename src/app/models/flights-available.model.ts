export interface FlightAvailable{
    id:number;
    airlines: string;
    planeNo:string;
    name:string;
    seatCount :string;            
    stops:number;
    price:number;
    source:string;
    sourceIOTA:string;
    destination:string;
    destinationIOTA:string;    
    sourceTime: string;
    destinationTime:string;
    sourceDate: string;
    destinationDate: string;
    duration:string
}

export interface FlightsAvailable
{
  flights: FlightAvailable[];
}