import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { IMovie } from '../model/movie';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movies: IMovie[] = [];
  selectedMovie!: IMovie;
  editedMovie!: IMovie;

  faLogout = faSignOutAlt

  isEditMovie: Boolean = false;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }



  createNewMovie() {
    this.editedMovie = {
      title: '',
      description: ''
    }

    this.isEditMovie = true;
  }

  movieCreated(movie: IMovie) {
    this.movies.push(movie);
    this.isEditMovie = false;
  }

  selectMovie(movie: IMovie) {
    this.selectedMovie = movie;
    console.log('selectedMovie ', this.selectedMovie);
    this.isEditMovie = false;
  }

  editMovie(movie: IMovie) {
    this.editedMovie = movie;
    this.isEditMovie = true;
  }
  movieUpdated(movie: IMovie) {
    let index = this.movies.findIndex(mov => mov.id === movie.id);
    if (index >= 0) {
      this.movies[index] = movie;
    }
    this.isEditMovie = false;
  }

  deletedMovie(movie: IMovie) {
    this.apiService.deleteMovie(movie.id!).subscribe((res: HttpResponse<IMovie>) => (this.movies = this.movies.filter(mov => mov.id !== movie.id), console.log(res.body)));
  }

  logout() {
    this.cookieService.delete('mr-token');
    this.router.navigate(['/auth']);
  }

  ngOnInit(): void {

    const token = this.cookieService.get('mr-token');
    if (!token) {
      this.router.navigate(['/auth']);
    } else {
      this.apiService.getMovies().subscribe((res: HttpResponse<IMovie[]>) => (this.movies = res.body || []));
    }
  }

}
