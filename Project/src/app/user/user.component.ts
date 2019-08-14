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
  selectrole = '';
  users;
  groups = [];
  selectgroup = '';
  roles = ['Group Admin', 'Super Admin'];
  ngOnInit() {
    this.postSub = this.route.paramMap.subscribe(
      params => {this.id = params.get('id');}
    );
    this.service.AllChannels().subscribe(res => {
      if(res.valid === true) {
        this.channels = res.channels;
    
      }
    });
    this.service.AllUsers().subscribe(res => {
      if(res.valid === true) {
        this.users = res.users;
      }
    });
    this.service.AllGroups().subscribe(res => {
      if(res.valid === true) {
      this.groups = res.groups;
      }
    });
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
          this.error = res.message;
        }
      });
    }
  }

  RemoveUser() {
    if(this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
   
    else {
      this.service.RemoveUser(this.selectuser).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully removed';
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = 'User cannot be removed';
        }
      });
    }
  }
  AssignUserGroupAssis() {
    if(this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
   
    else {
      this.service.AssignUserGroupAssis(this.selectuser).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully assigned the role of Group Assis ';
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = this.selectuser + ' has already been assigned the role of Group Assis'
        }
      });
    }
  }

  AssignUserRole() {
    if(this.selectrole === '' || this.selectrole === undefined || this.selectrole === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid role';
    }
    else if (this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
   
    else {
      this.service.AssignUserRole(this.selectuser, this.selectrole).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully assigned the role of ' + this.selectrole;
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = this.selectuser + ' has already been assigned the role of ' + this.selectrole;
        }
      });
    }
  }

  AddUserGroup() {
    if(this.selectgroup === '' || this.selectgroup === undefined || this.selectgroup === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid group';
    }
    else if (this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
   
    else {
      this.service.AddUsertoGroup(this.selectuser, this.selectgroup).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully been added to the group ' + this.selectgroup;
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = this.selectuser + ' has already been added to the group ' + this.selectgroup;
        }
      });
    }
  }

  RemoveUserFromGroup() {
    if(this.selectgroup === '' || this.selectgroup === undefined || this.selectgroup === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid group';
    }
    else if (this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
   
    else {
      this.service.RemoveUserFromGroup(this.selectuser, this.selectgroup).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully been removed from the group ' + this.selectgroup;
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = this.selectuser + ' is not part of the group ' + this.selectgroup;
        }
      });
    }
  }

}
