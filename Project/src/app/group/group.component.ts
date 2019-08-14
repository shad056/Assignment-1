import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {MetaService} from '../services/meta.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private service: MetaService) { }
  private postSub: Subscription;
  id;
  groupname;
  channelname;
  errors = false;
  error;
  success = false;
  successmsg;
  groups = [];
  selectgroup = "";
  selectchannel = '';
  channels = [];
  ngOnInit() {
    this.postSub = this.route.paramMap.subscribe(
      params => {this.id = params.get('id');}
    );
    this.service.AllGroups().subscribe(res => {
      if(res.valid === true) {
      this.groups = res.groups;
      }
    });
    this.service.AllChannels().subscribe(res => {
      if(res.valid === true) {
        this.channels = res.channels;
      }
    })
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
  CreateGroup() {
    if(this.groupname === undefined || this.groupname === '') {
      this.success = false;
      this.errors = true;
        this.error = 'Please enter a group name';
    }
    else {
    this.service.AddGroup(this.groupname).subscribe(res => {
      if(res.valid==true){
        this.errors = false;
        this.success = true;
        this.successmsg = this.groupname + ' has been successfully added';
      }
      else {
        this.success = false;
        this.errors = true;
        this.error = 'Group already exists, Please try again';
      }
    });
  }
  }
  CreateChannel() {
    if(this.selectgroup === "" || this.selectgroup === undefined) {
      this.success = false;
      this.errors = true;
        this.error = 'Group is not selected';
    }
    else if(this.channelname === undefined || this.channelname === '') {
      this.success = false;
      this.errors = true;
      this.error = 'Please enter a valid channel name';
    }
    else {
    this.service.AddChannel(this.selectgroup, this.channelname).subscribe(res => {
      if(res.valid===true){
        this.errors = false;
        this.success = true;
        this.successmsg = this.channelname + ' has been successfully added to the group ' + this.selectgroup;
      }
      else {
        this.success = false;
        this.errors = true;
        this.error = 'Channel already exists, Please try again';
      }

    });
    }
  }
  RemoveGroup() {
    if(this.selectgroup === "" || this.selectgroup === undefined) {
      this.success = false;
      this.errors = true;
        this.error = 'Group is not selected';
    }
    else {
      this.service.RemoveGroup(this.selectgroup).subscribe(res => {
        if(res.valid===true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectgroup + ' has been successfully removed ';
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = 'Group doesnt exists, Please try again';
        }
  
      });
      }
  }
  RemoveChannel() {
    if(this.selectchannel === "" || this.selectchannel === undefined) {
      this.success = false;
      this.errors = true;
        this.error = 'Channel is not selected';
    }
    else {
      this.service.RemoveChannel(this.selectchannel).subscribe(res => {
        if(res.valid===true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectchannel + ' has been successfully removed ';
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = 'Channel doesnt exists, Please try again';
        }
  
      });
      }
  }  

}
