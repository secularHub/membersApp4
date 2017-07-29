import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { FilterPipe } from './members/filter.pipe';
import { PaymentComponent } from './payment/payment.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AuthGuard } from './common/auth.guard';
import { routing } from "./app.routing";
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { NametagsComponent } from './nametags/nametags.component';
import { ReportsComponent } from './reports/reports.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SignupComponent } from './signup/signup.component';
import * as firebase from 'firebase/app';
export { firebase };
//import {AuthHttp} from "angular2-jwt";
export const firebaseConfig = {
  apiKey: "AIzaSyD3UeQygrWX3JWL3o9DWe8c-7r-rF1KD30",
  authDomain: "memberships-a6f7c.firebaseapp.com",
  databaseURL: "https://memberships-a6f7c.firebaseio.com",
  projectId: "memberships-a6f7c",
  storageBucket: "memberships-a6f7c.appspot.com",
  messagingSenderId: "554568556346"
};

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    FilterPipe,
    PaymentComponent,
    MaintenanceComponent,
    NavbarComponent,
    LoginComponent,
    NametagsComponent,
    ReportsComponent,
    SignupComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
