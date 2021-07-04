import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  film =faFilm;

  faLogout = faSignOutAlt

  loggedIn = false;

  constructor(
    private cookieService:CookieService,
    private router:Router,
    private apiService:ApiService
    ){}


  logout() {
    this.cookieService.delete('mr-token');
    this.router.navigate(['/auth']);
    this. checkToken();
  }

  checkToken() {
    var token = this.cookieService.get('mr-token');
    console.log(token);
    if (token) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  userLogin(){
    this.apiService.userLogin.subscribe(loggedIn => {
      if (loggedIn) {
        this. checkToken();
       }
    });
  }

  ngOnInit() {
    this.userLogin();
    this. checkToken();
  }

}
