import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab';
  login = false;
  ngOnInit() {
    if(localStorage.getItem("userdetails") !== null) {
      this.login=true;
     }
  }
  LogOut() {
    localStorage.removeItem("userdetails");
    this.login = false;

  }
}
