import { Component,EventEmitter, OnInit, AfterViewInit, HostBinding, ViewChildren, Output } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import {  AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
//import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';
import { confignjs} from '../members/config';
import { moveIn } from '../router.animations';
import {AuthService} from "../common/auth.service";

@Component({
  selector: 'app-login',
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['..//members/members.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})

export class LoginComponent implements OnInit, AfterViewInit {

  @Output() OnLoginSuccess = new EventEmitter<boolean>();
  @ViewChildren('username') vc;
  someData: string;
  error: any;
  constructor(public router: Router, public http: Http, private  as: AuthService) {
    if(!this.as.isAuthenticated()){
      this.router.navigateByUrl('/members');
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
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
  login(event, username, password) {
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
  }
}
