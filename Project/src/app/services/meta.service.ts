import { Users } from './Models/Users';
import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Post} from './Models/dataModel';
import {HttpErrorResponse} from '@angular/common/http';
import { Subject } from "rxjs"; //Event Handler

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  posts;
  
  constructor(private http: HttpClient) {
   }

 
Authenticate(uname) { 
  var user = {username: uname};
  return this.http.post<any>('http://localhost:3000/api/auth', user);
      }

LoadGroups(uname) {
  var user = {username: uname};
  return this.http.post<any>('http://localhost:3000/api/groups', user);
}
FindChannel(group) {
  return this.http.post<any>('http://localhost:3000/api/channels', {chosengroup: group});
}
}
