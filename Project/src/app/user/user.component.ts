import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {MetaService} from '../services/meta.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private service: MetaService) { }
  private postSub: Subscription;
  id;
  uname;
  email;
  errors;
  error;
  success;
  successmsg;
  selectchannel = '';
  channels = [];
  selectuser = '';
  users;
  ngOnInit() {
    this.postSub = this.route.paramMap.subscribe(
      params => {this.id = params.get('id');}
    );
    this.service.AllChannels().subscribe(res => {
      if(res.valid === true) {
        this.channels = res.channels;
    
      }
    })
    this.service.AllUsers().subscribe(res => {
      if(res.valid === true) {
        this.users = res.users;
      }
    })
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
  CreateUser() {
    if(this.uname === undefined || this.uname === '') {
      this.success = false;
      this.errors = true;
        this.error = 'Please enter a valid user name';
    }
    else if (this.email === undefined || this.email === '') {
      this.success = false;
      this.errors = true;
        this.error = 'Please enter a valid user email address';
    }
    else {
      this.service.AddUser(this.uname,this.email).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.uname + ' has been successfully added';
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = 'User already exists, Please try again';
        }
      });
    }
  }
  onUserAddtoChannel() {
    if(this.selectchannel === '' || this.selectchannel === undefined || this.selectchannel === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid channel';
    }
    else if (this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
    else {
      this.service.AddUsertoChannel(this.selectuser,this.selectchannel).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully added to the channel ' + this.selectchannel;
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = 'User already is added to this channel, Please try again';
        }
      });
    }
  }
  RemoveUserfromChannel() {
    if(this.selectchannel === '' || this.selectchannel === undefined || this.selectchannel === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid channel';
    }
    else if (this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
    else {
      this.service.RemoveUserfromChannel(this.selectuser,this.selectchannel).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully removed from the channel ' + this.selectchannel;
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = 'Error, Please try again';
        }
      });
    }
  }

}
