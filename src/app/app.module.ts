import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule ,routingComponents} from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { CookieService } from 'ngx-cookie-service';
import { BookingComponent } from './booking/booking.component';

import { HttpClientModule } from '@angular/common/http';
import { BookingconfirmationComponent } from './bookingconfirmation/bookingconfirmation.component';
import { PaymentComponent } from './payment/payment.component';
import { ViewbookingsComponent } from './viewbookings/viewbookings.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    SearchresultsComponent,
    BookingComponent,
    BookingconfirmationComponent,
    PaymentComponent,
    ViewbookingsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService,AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
