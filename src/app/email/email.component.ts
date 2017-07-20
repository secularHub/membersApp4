import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import {  AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import {AuthService} from "../common/auth.service";

@Component({
  selector: 'app-email',
  providers: [ AuthService],
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {
  state: string = '';
  error: any;
  constructor(public afAuth: AngularFireAuth,private router: Router, private af: AuthService) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/members');
      }
    });
  }
  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.signInWithFacebook();
    }
  }
  ngOnInit() {
  }

}
