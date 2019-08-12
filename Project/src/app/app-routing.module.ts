import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AccountComponent} from './account/account.component';
import { ChannelComponent } from './channel/channel.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [{ path: 'login', component: LoginComponent }, { path: 'account', component: AccountComponent}, {path: 'profile', component: ProfileComponent},
{path: 'channelhistory/:channel',component: ChannelComponent}, {path: 'chat/:channel',component: ChatComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
