import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import {ApiService} from '../api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieDeleteDialogComponent } from './movie-delete-dialog/movie-delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes:Routes = [
  {path: 'movies', component:MainComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieFormComponent,
    MovieDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ApiService
  ]
})
export class MainModule { }
