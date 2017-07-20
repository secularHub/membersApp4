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

  signInEmail()
  signIn(provider: firebase.auth.AuthProvider): firebase.Promise<any> {
    return this.aa.auth.signInWithPopup(provider)
      .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
  }

  signInAnonymously(): firebase.Promise<any> {
    return this.aa.auth.signInAnonymously()
      .catch(error => console.log('ERROR @ AuthService#signInAnonymously() :', error));
  }

  signInWithGithub(): firebase.Promise<any> {
    return this.signIn(new firebase.auth.GithubAuthProvider());
  }

  signInWithGoogle(): firebase.Promise<any> {
    return this.signIn(new firebase.auth.GoogleAuthProvider());
  }

  signInWithTwitter(): firebase.Promise<any> {
    return this.signIn(new firebase.auth.TwitterAuthProvider());
  }

  signInWithFacebook(): firebase.Promise<any> {
    return this.signIn(new firebase.auth.FacebookAuthProvider());
  }

  signOut(): void {
    this.aa.auth.signOut();
  }
}
