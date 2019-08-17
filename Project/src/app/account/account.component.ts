import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MetaService} from '../services/meta.service';
import { HttpErrorResponse } from '@angular/common/http';
import{HttpClient} from '@angular/common/http';
import { dataModel } from '../services/Models/dataModel';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
   username;
   group = [];
   channels = [];
   roles = [];
   selectgroup = "";
   selectchannel = "";
   error = false;
   errors = '';
   groupadmin = false;
   superadmin = false;
   groupassis = false;
  constructor(private router: Router, private service: MetaService, private http: HttpClient) { }

  ngOnInit() {

   if(localStorage.getItem("userdetails") === null) {
    this.router.navigateByUrl('/login');
   }
   else {
   var user = JSON.parse(localStorage.getItem("userdetails"));
    this.username = user.username;
    this.service.LoadGroups(this.username).subscribe(res => {
      if(res.valid == false) {
        this.group = null;
      }
      else {
        
        this.group = res.group;
        this.group.push('Custom Channel Group');
        this.roles = res.role;
        for (let role of this.roles) {
          if(role == 'Group Admin') {
            this.groupadmin = true;
          }
          if(role == 'Group Assis') {
            this.groupassis = true;
          }
          if(role == 'Super Admin') {
            this.superadmin = true;
          }

      }
      }
    },
    (err: HttpErrorResponse) => {
      console.log (err.message);
    }
    );
   }
  }
  onLogOut(){
    localStorage.removeItem("userdetails");
    this.router.navigateByUrl('/login');
  }
  onGroupClick(group: any) {
    if(group == 'Custom Channel Group') {
      this.http.post<dataModel>('http://localhost:3000/api/groups', {username:this.username}).subscribe(res => {
        if(res.valid == true) {
          this.channels = res.channel;
        }
      },
        (err: HttpErrorResponse) => {console.log(err.error); }
  
  
      );
    }
    else {
    this.http.post<dataModel>('http://localhost:3000/api/channels', {chosengroup: group}).subscribe(
      res => {
        if(res.valid == true) {
          this.channels = res.channel;
          
        }
        else {
          this.channels = null;
         
        }
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    }
  }
  onChannelClick() {
    if(this.selectchannel == '') {
      this.error = true;
      this.errors = 'Please select a channel first';
    }
    else {
    this.router.navigateByUrl('/channelhistory/' + this.selectchannel);
    }
  }
  onChatClick() {
    if(this.selectchannel == '') {
      this.error = true;
      this.errors = 'Please select a channel first';
    }
    else {
    this.router.navigateByUrl('/chat/' + this.selectchannel);
    }
  }
 
  onGotoUserComponent(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var id = target.attributes.id.nodeValue;
    this.router.navigateByUrl('/user/' + id);
  }
  onUserAddtoChannel(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var id = target.attributes.id.nodeValue;
    this.router.navigateByUrl('/user/' + id);
  }
 
  onGotoGroupComponent(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var id = target.attributes.id.nodeValue;
    this.router.navigateByUrl('/group/' + id);
  }
}
