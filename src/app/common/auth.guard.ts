/**
 * Created by fox21 on 1/13/2017.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import {AuthService} from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.afAuth.authState
      .take(1)
      .map(authState => !!authState)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/sign-in']);
        }
      });
  }
}

