import { Component } from '@angular/core';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  film =faFilm;

  faLogout = faSignOutAlt

  logout() {

  }

}
