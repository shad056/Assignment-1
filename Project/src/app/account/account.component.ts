import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MetaService} from '../services/meta.service';
import { HttpErrorResponse } from '@angular/common/http';
import{HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
   username;
   group = [];
   channels = [];
   selectgroup = "";
   selectchannel = "";
   error = false;
   errors = '';
   role;
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
    this.http.post<any>('http://localhost:3000/api/channels', {chosengroup: group}).subscribe(
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
    this.http.post<any>('http://localhost:3000/api/groups', {username:this.username}).subscribe(res => {
      if(res.valid == true) {
        this.channels.push(res.channel);
      }
    },
      (err: HttpErrorResponse) => {console.log(err.error); }


    );
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
}
