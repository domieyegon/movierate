import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  faEdit,
  faPlus,
  faStar,
  faTh,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/api.service';
import { IMovie } from 'src/app/model/movie';
import { MovieDeleteDialogComponent } from '../movie-delete-dialog/movie-delete-dialog.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  @Input() movies?: IMovie[] = [];
  @Output() selectMovie = new EventEmitter<IMovie>();
  @Output() editedMovie = new EventEmitter<IMovie>();
  @Output() createNewMovie = new EventEmitter();
  @Output() deletedMovie = new EventEmitter<IMovie>();

  faStar = faStar;
  addNew = faPlus;
  edit = faEdit;
  trash = faTrash;
  loading = false;

  rateHovered = 0;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private cookieService: CookieService
  ) {}

  movieClicked(movie: IMovie) {
    this.selectMovie.emit(movie);
  }

  editMovie(movie: IMovie) {
    this.apiService.openDialog(movie);
    // this.editedMovie.emit(movie);
  }

  newMovie() {
    const movie = {
      title: '',
      description: '',
    };
    this.apiService.openDialog(movie);
    // this.createNewMovie.emit();
  }

  rateHover(rate: number, movieId: number) {
    let index = this.movies?.findIndex((val) => val.id === movieId);

    for (let movie of this.movies!) {
      if (movie.id === movieId) {
        movie.user_rating_temp = rate;
        // this.rateHovered = rate;
      }
    }
  }

  rateCLicked(rate: number, movieId: number) {
    this.apiService
      .rateMovie(rate, movieId)
      .subscribe(
        (res: HttpResponse<IMovie>) => (this.getMovies(), console.log(res))
      );
  }

  deleteMovie(movie: IMovie) {
    this.dialog.open(MovieDeleteDialogComponent, {
      data: movie,
      maxWidth: '450px',
    });
  }

  getMovies() {
    this.loading = true;
    this.apiService.getMovies().subscribe((res: HttpResponse<IMovie[]>) => {
      this.loading = false;
      this.movies = res.body || [];
      for (const movie of this.movies) {
        if (movie.title!.length > 26) {
          movie.title_temp = movie.title?.substring(0, 26) + '...';
        } else {
          movie.title_temp = movie.title;
        }

        if (movie.description!.length > 100) {
          movie.description_temp = movie.description?.substring(0, 90) + '...';
        } else {
          movie.description_temp = movie.description;
        }

        movie.logo = movie.title?.charAt(0);
      }
    });
  }

  getOperationStatus() {
    this.apiService.operationSuccess.subscribe((success) => {
      console.log(success);
      if (success) {
        this.getMovies();
      }
    });
  }

  ngOnInit(): void {
    const token = this.cookieService.get('mr-token');
    if (token) {
      this.getMovies();
      this.getOperationStatus();
    }
  }
}
