import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() { }

  login() {
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
  }

}
