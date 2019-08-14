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
AddGroup(group) {
  return this.http.post<any>('http://localhost:3000/api/creategroup',{newgroup: group});
}
AllGroups() {
  return this.http.get<any>('http://localhost:3000/api/getgroups');
}
AddChannel(group, channel) {
  return this.http.post<any>('http://localhost:3000/api/createchannel',{group: group, channel: channel});
}
AddUser(user,email) {
  return this.http.post<any>('http://localhost:3000/api/createuser',{user: user, email:email});
}
AllChannels() {
  return this.http.get<any>('http://localhost:3000/api/getchannels');
}
AllUsers() {
  return this.http.get<any>('http://localhost:3000/api/getusers');
}
AddUsertoChannel(user,channel) {
  return this.http.post<any>('http://localhost:3000/api/addusertochannel',{user: user, channel:channel});
}
RemoveGroup(group) {
  return this.http.post<any>('http://localhost:3000/api/removegroup',{group: group});
}
RemoveChannel(channel) {
  return this.http.post<any>('http://localhost:3000/api/removechannel',{channel: channel});
}
RemoveUserfromChannel(user,channel) {
  return this.http.post<any>('http://localhost:3000/api/removeuserfromchannel',{user:user,channel: channel});
}
RemoveUser(user) {
  return this.http.post<any>('http://localhost:3000/api/removeuser',{user:user});
}
AssignUserGroupAssis(user) {
  return this.http.post<any>('http://localhost:3000/api/assignusergroupassis',{user:user});
}
AssignUserRole(user,role) {
  return this.http.post<any>('http://localhost:3000/api/assignuserrole',{user:user, role: role});
}
AddUsertoGroup(user,group) {
  return this.http.post<any>('http://localhost:3000/api/addusertogroup',{user:user, group: group});
}
RemoveUserFromGroup(user,group) {
  return this.http.post<any>('http://localhost:3000/api/removeuserfromgroup',{user:user, group: group});
}
}
