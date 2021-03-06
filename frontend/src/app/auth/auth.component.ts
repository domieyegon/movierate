import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { ILogin } from '../model/login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  registerMode = false;
  loading = false;

  film = faFilm

  errorFlag:boolean = false;
  errorMessage:string = "";

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })


  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  login() {
    if (!this.registerMode) {
      this.loginUser();
    } else {
      this.apiService.registerUser(this.authForm.value).subscribe((res: HttpResponse<ILogin>) => (
        this.loginUser(),
        this.registerMode = false,
        console.log(res)
        ),
        err=> {
          this.errorFlag = true;
          this.errorMessage = "The user with that username already exists";
        }
        );
    }
  }

  loginUser() {
    this.loading= true;
    this.apiService.loginUser(this.authForm.value).subscribe(
      (res: HttpResponse<ILogin>) => (
        this.cookieService.set('mr-token',
        res.body!.token!),
        this.router.navigate(['/movies']),
        console.log(res),
        this.errorFlag = false,
        this.apiService.setloggedIn(true),
        this.loading= false
        ),
        err=> {
          this.errorFlag = true;
          this.errorMessage = "Invalid username or password!";
          this.loading= false;
        });
  }


  formDisabled() {
    if (this.authForm.value.username.length && this.authForm.value.password.length) {
      return false;
    } else {
      return true;
    }
  }
  ngOnInit(): void {
    const token = this.cookieService.get('mr-token');
    if (token) {
      this.router.navigate(['/movies']);
    }
  }

}
