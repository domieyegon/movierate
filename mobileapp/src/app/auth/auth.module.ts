import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


const routes:Routes= [
  {path: 'auth', component:AuthComponent}
];


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers:[
    CookieService
  ],
  exports: [
    RouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthModule { }
