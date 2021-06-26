import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { ILogin } from '../model/login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private apiService:ApiService,
    private cookieService: CookieService,
    private router:Router
  ) { }

  login() {
    this.apiService.loginUser(this.authForm.value).subscribe((res: HttpResponse<ILogin>)=>(this.cookieService.set('mr-token', res.body!.token!), this.router.navigate(['/movies']),console.log(res)));

    console.log("Logind details", this.authForm.value);
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
    if(token) {
      this.router.navigate(['/movies']);
    }
  }

}
