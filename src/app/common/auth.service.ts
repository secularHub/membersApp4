import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '../app.module';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase} from "angularfire2/database";


@Injectable()
export class AuthService {
  authenticated$: Observable<boolean>;
  uid$: Observable<string>;
  user: string;
  authenticated: boolean;
  usersList: Observable<any[]>;
  authEmail$: Observable<string>;
  authUid$: Observable<string>;
  isAnonymous$: Observable<boolean>;

  constructor(public aa: AngularFireAuth, public db: AngularFireDatabase) {
    this.authenticated = false;
    this.authenticated$ = aa.authState.map(user => !!user);
    this.uid$ = aa.authState.map(user => user.uid);
    this.usersList = db.list('users');
    this.authenticated$  = aa.authState.map(user => !!user);
    this.isAnonymous$ = aa.authState.map(user => {
      if (user == null) {
        return false
      }
      else {
        return user.isAnonymous
      }
    });
    this.authEmail$ = aa.authState.map(user => {
      if (user == null){
        return ''
      }
      else {
        return user.email
      }
    });
    this.authUid$ = aa.authState.map(user => {
      if (user == null){
        return ''
      }
      else {
        return user.uid
      }
    });
  }

  isAuthenticated(){
    if(this.authenticated)
      return true;
    return false;
  }



  signOut(): void {
    this.aa.auth.signOut();
  }
}
