import { ViewbookingsComponent } from './viewbookings/viewbookings.component';
import { BookingconfirmationComponent } from './bookingconfirmation/bookingconfirmation.component';
import { BookingComponent } from './booking/booking.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'searchresults',component:SearchresultsComponent},
  {path: 'booking',component:BookingComponent,canActivate:[AuthGuard] },
  {path:'bookingConfirmation', component:BookingconfirmationComponent,canActivate:[AuthGuard] },
  {path:'payment',component: PaymentComponent,canActivate:[AuthGuard] },
  {path:'viewbookings',component:ViewbookingsComponent,canActivate:[AuthGuard] }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent,HomepageComponent,RegisterComponent];