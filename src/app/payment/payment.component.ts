import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {IPayment, Payment} from './payment';
import {Member} from "../members/member";

//import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({

  selector: 'as-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  constructor(){
    if(this.payments == null || this.payments.length === 0){
      this.pay =  {receivedDate: new Date(), amount: 0, type: "check", targetDate: new Date(), active: false, receivedDateNumeric : 0};
    }
    else {
      this.pay = this.payments[0];
    }
    this.isShowAddNew = false;
    this.isShowDelete = false;
    this.isShowSubmit = true;
    this.isShowDiscard = true;

  }
  //todo add setter for members

  @Input('member')

  set member(m: Member){
    let p = m.payments;
    this.lmember = m;
    this.pay =  {receivedDate: new Date(), amount: 0, type: "check", targetDate: new Date(), active: false, receivedDateNumeric : 0};
/*    this.isShowAddNew = true;
    this.isShowDelete = false;
    this.isShowSubmit = false;
    this.isShowDiscard = false;*/
    if(p != null && p.length > 0) {
      this.showList = true;
      this.pmts = p.sort((l,r) => {if (l.receivedDate < r.receivedDate) return 1; if(l.receivedDate > r.receivedDate) return -1; else return 0;});
    }
    this.pmts = p;
    this.payments = p;
  }
  get member(): Member{
    return this.lmember;
  }
//  @Output() OnTransDate = new EventEmitter<string>();
  @Output() OnResponse = new EventEmitter<string>();
  @Output() OnSaved = new EventEmitter<Member>();
  @Output() OnPayModified = new EventEmitter<boolean>();
  lmember: Member;
  payments: Array<IPayment>;
  ecol: string;
  pay: IPayment;
  paypicked: IPayment;
  showInputs: boolean;
  showList: boolean;
  isShowDelete: boolean;
  isShowAddNew: boolean;
  isShowSubmit: boolean;
  isShowDiscard: boolean;
  saveResults: string;

  receivedDateFormatted: string;
  datetry: any;
  usermode: string;
  private pmts: Array<IPayment>;

  private hasChanges(): boolean {
    if (JSON.stringify(this.pay) === JSON.stringify(this.paypicked))
      return false;
    else
      return true;
  }

  set humanDate(e){ /* What gets Saved */
    let ee = e.split('-');
    let d = new Date(Date.UTC(Number(ee[0]), Number(ee[1])-1, Number(ee[2])+1)) ;
    this.pay.receivedDate = new Date(d.toISOString().substring(0,19));
  }
  get humanDate(){ /* What gets displayed */
    if(this.pay != null) {
      let d = new Date(this.pay.receivedDate.valueOf());
      let s = d.toLocaleDateString();
      let ee = s.split('/');
      if(ee[0].length == 1)
        ee[0] = "0" + ee[0];
      if(ee[1].length == 1)
        ee[1] = "0" + ee[1];
      let final = ee[2] + "-" + ee[0] + "-" + ee[1];
      return final;
    }
  }

  submitForm() {
      /*this.Delete(this.payd);  //referenced saved for possible deletes
      this.payments.push(this.pay);*/
      if (this.pay.amount <= 0 || (this.lmember.firstName == undefined && this.lmember.lastName == undefined))
        this.saveResults = "Invalid amount or name! Cannot add payment.";
      else {
        if (this.hasChanges()){
          this.Delete(this.paypicked);
          this.member.payments.push(this.pay);
          this.isShowAddNew = false;
          this.isShowSubmit = true;
          this.isShowDiscard = true;
          this.isShowDelete = false;
          this.saveResults = "";
          this.OnSaved.emit(this.member);
          this.payments = this.payments.sort((l,r) => {if (l.receivedDate < r.receivedDate) return 1; if(l.receivedDate > r.receivedDate) return -1; else return 0;});
          this.saveResults = "Payment saved successfully!";
        }
        else
          this.saveResults = "No changes, save not required!"
      }

    this.pay =  {receivedDate: new Date(), amount: 0, type: "check", targetDate: new Date(), active: false, receivedDateNumeric : 0};
    this.OnResponse.emit(this.saveResults);
  }

  Delete(p: Payment){
    let index = this.payments.indexOf(p, 0);
    if (index > -1) {
      this.payments.splice(index, 1);
    }
  }

  onDelete(){
    this.Delete(this.paypicked);
    this.isShowAddNew = false;
    this.isShowSubmit = true;
    this.isShowDiscard = true;
    this.isShowDelete = false;
    this.saveResults = "";
    this.OnSaved.emit(this.member);
    this.pay =  {receivedDate: new Date(), amount: 0, type: "", targetDate: new Date(), active: false, receivedDateNumeric: 0};
    this.payments = this.payments.sort((l,r) => {if (l.receivedDate < r.receivedDate) return 1; if(l.receivedDate > r.receivedDate) return -1; else return 0;});
  }
/* Not being used at the moment
  onAdd(){
    if ((this.member.firstName == undefined && this.member.lastName == undefined) || this.pay.amount <= 0)
      this.saveResults = "Invalid member or amount! Cannot add payment";
    else
//      this.submitForm();
//      this.pay =  {receivedDate: new Date(), amount: 0, type: "cash", targetDate: new Date(), active: false, receivedDateNumeric: 0};
      this.payments.push(this.pay);
      this.payments = this.payments.sort((l,r) => {if (l.receivedDate < r.receivedDate) return 1; if(l.receivedDate > r.receivedDate) return -1; else return 0;});
/*      this.memservice.putDoc(this.member);
      this.memservice.getDoc(this.member._id).subscribe(res =>{
        let doc = res;
        if(doc._rev === this.member._rev)
          this.saveResults = "Changes saved successfully!";
        else
          this.saveResults = "Save Failed! Refresh and try again."
      });
      this.isShowAddNew = true;
      this.isShowSubmit = false;
      this.isShowDiscard = true;
      this.isShowDelete = false;
      this.saveResults = "";
      if (this.lmember.index == null)
        this.lmember.index++;
      this.OnPayModified.emit(true);
    }
*/
  onDiscard(){
    this.saveResults = "";
    this.isShowAddNew = false;
    this.isShowSubmit = true;
    this.isShowDiscard = true;
    this.isShowDelete = false;
    this.pay =  {receivedDate: new Date(), amount: 0, type: "check", targetDate: new Date(), active: false, receivedDateNumeric : 0};
  }

  public onPaymentTable(pay :IPayment){
    this.pay = Object.assign({},pay);
    this.saveResults = "";
    this.isShowAddNew = false;
    this.isShowSubmit = true;
    this.isShowDiscard = false;
    this.isShowDelete = true;
    this.paypicked = pay;
    this.OnPayModified.emit(true);
  }

  ngOnInit(){
//    this.isShowAddNew = true;
//    this.isShowSubmit = true;
//    this.isShowDiscard = true;
//    this.isShowDelete = false;
    this.showInputs = true;
    this.showList = true;
//    this.saveResults = "";

    /*for(let p of this.payments)
     {
     let d = new Date(p.receivedDate.valueOf());
     p.receivedDateNumeric = Number(d.getFullYear() + d.getUTCMonth() + d.getUTCDay());
     }
     this.payments = this.payments.sort((l,r) => {if (l.receivedDate < r.receivedDate) return 1; if(l.receivedDate > r.receivedDate) return -1; else return 0;});*/
    //this.receivedDateFormatted = this.pay.receivedDate.toISOString().substring(0, 10);
    /*
     for (let p of this.payments)
     {
     let d = new Date(p.receivedDate.valueOf());
     p.receivedDateString = d.toISOString();
     }
     */
  }
}
