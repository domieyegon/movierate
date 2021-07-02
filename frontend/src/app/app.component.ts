import { Component } from '@angular/core';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MovieFormComponent } from './main/movie-form/movie-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  film =faFilm;

  faLogout = faSignOutAlt

  constructor(private dialog: MatDialog){}

  openDialog() {
    this.dialog.open(MovieFormComponent);
  }

}
