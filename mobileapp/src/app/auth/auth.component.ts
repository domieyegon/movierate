import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { ApplicationSettings } from '@nativescript/core';
import { SnackBar } from 'nativescrpt-snackbar';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { LoginInput } from '../model/LoginInput';
// import {RadDataFormComponent} from 'nativescript-pro-ui/dataform/angular';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  registerMode = false;
  loading: boolean;
  input: LoginInput

  challengeDesc = '';
  // @ViewChild('myLoginDataForm') myLoginDataFormComp: RadDataFormComponent;

  // authForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl('')
  // })

  constructor(
    private apiService: ApiService,
    private router: RouterExtensions
  ) { }


  ngOnInit() {
    this.loading = false;
    if (ApplicationSettings.getString('mr-token')) {
      this.router.navigate(['/movies']);
    }

    this.input = new LoginInput("", "");
  }

  onLogin() {

      this.loading = true;
      const userData = {username:this.input.username, password: this.input.password};

      this.apiService.loginUser(userData).subscribe(
        (res: HttpResponse<LoginInput>) =>
        (ApplicationSettings.setString('mr-token',res.body!.token!),
         this.loading= false,
         this.router.navigate(['/movies'], {clearHistory: true}),
          console.log(res)
        ));
  }

  onRegister() {
    this.loading = true;
    const userData = {username:this.input.username, password: this.input.password};
    this.apiService.registerUser(userData).subscribe(
      (res: HttpResponse<LoginInput>) => (
        this.onLogin(),
        this.registerMode = false,
        this.loading = false,
        console.log(res)
      ));
  }

  // onLogin() {
  //   if (this.loading) {
  //     this.loading = true;
  //     const userData = {username:this.input.username, password: this.input.password};
  //     this.apiService.loginUser(userData).subscribe((res: HttpResponse<LoginInput>) => (ApplicationSettings.setString('mr-token', res.body!.token!), this.router.navigate(['/movies']), this.loading= false, console.log(res)));
  //   } else {
  //     (new  SnackBar()).simple("All fields Required!");
  //   }
  // }


  // login() {
  //   if (!this.registerMode) {
  //     this.loginUser()
  //   } else {
  //     this.apiService.registerUser(this.authForm.value).subscribe((res: HttpResponse<ILogin>) => (this.loginUser(), this.registerMode = false, console.log(res)));
  //   }
  // }

  // loginUser() {
  //   this.apiService.loginUser(this.authForm.value).subscribe((res: HttpResponse<ILogin>) => (this.cookieService.set('mr-token', res.body!.token!), this.router.navigate(['/movies']), console.log(res)));
  // }


  // formDisabled() {
  //   if (this.authForm.value.username.length && this.authForm.value.password.length) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  // ngOnInit(): void {
  //   const token = this.cookieService.get('mr-token');
  //   if (token) {
  //     this.router.navigate(['/movies']);
  //   }
  // }


}
