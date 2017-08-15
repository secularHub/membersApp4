import { Component,EventEmitter, OnInit, AfterViewInit, HostBinding, ViewChildren, Output } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { contentHeaders } from '../common/headers';
import { confignjs} from '../members/config';
import {AuthService} from "../common/auth.service";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  providers: [AuthService, AngularFireAuth],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']


})

export class LoginComponent implements OnInit {

  email:string;
  password: string;
  someData: string;
  error: any;
  status: string;

  @Output() OnLoginSuccess = new EventEmitter<boolean>();
  @ViewChildren('username') vc;
  constructor(public router: Router, public http: Http, private  as: AuthService, private aa: AngularFireAuth) {
    if(this.as.isAuthenticated()){
      this.router.navigateByUrl('/members');
    }
    this.status="";
  }

  ngOnInit() {
    this.status+="started";
  }


  loginEmail(){
    this.status += "loginEmail";
    this.aa.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() =>
        this.status+="login pass"
      )
      .catch(er => {console.log(er);
        this.status += er;
      });
  }
 /* loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        this.router.navigate(['/members']);
      }).catch(
      (err) => {
        this.error = err;
      })
  }
  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        this.router.navigate(['/members']);
      }).catch(
      (err) => {
        this.error = err;
      })
  }*/
  /*login(event, username, password) {
    event.preventDefault();
    let h = confignjs.hostlocal;
    this.someData="init:";
    let body = JSON.stringify({ username, password });
    this.http.post(h + '/sessions/login', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          this.someData="ok";
          this.OnLoginSuccess.emit(true);

        },
        error => {

          this.someData = "error: " + error.text();
          console.log(error.text());
        }
      );
  }*/
}
