import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faEdit, faPlus, faStar, faTh, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';
import { IMovie } from 'src/app/model/movie';
import { MovieDeleteDialogComponent } from '../movie-delete-dialog/movie-delete-dialog.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input() movies?:IMovie[] = [];
  @Output() selectMovie = new EventEmitter<IMovie>();
  @Output() editedMovie = new EventEmitter<IMovie>();
  @Output() createNewMovie = new EventEmitter();
  @Output() deletedMovie = new EventEmitter<IMovie>();

  faStar = faStar;
  addNew = faPlus
  edit = faEdit
  trash = faTrash

  rateHovered = 0;

  constructor(
    private apiService:ApiService,
    private dialog:MatDialog,
  ) { }

  movieClicked(movie:IMovie) {
    this.selectMovie.emit(movie)
  }

  editMovie(movie:IMovie) {
    this.apiService.openDialog(movie);
    // this.editedMovie.emit(movie);
  }

  newMovie() {
    const movie = {
      title: '',
      description: ''
    }
    this.apiService.openDialog(movie);
    // this.createNewMovie.emit();
  }


  rateHover(rate:number, movieId: number) {
    let index = this.movies?.findIndex(val => val.id === movieId);

    for (let movie of this.movies!) {
      if (movie.id === movieId) {
        console.log(movie);

        movie.user_rating = rate;
        // this.rateHovered = rate;
      }
    }
   }

   rateCLicked(rate:number, movieId: number) {
     this.apiService.rateMovie(rate, movieId).subscribe((res: HttpResponse<IMovie>)=>(this.getMovies(), console.log(res)));
   }

  deleteMovie(movie:IMovie) {
    this.dialog.open(MovieDeleteDialogComponent, {data: movie, maxWidth: '450px'});
  }

  getMovies() {
    this.apiService.getMovies().subscribe((res: HttpResponse<IMovie[]>) =>{
      this.movies = res.body || [];
      for (const movie of this.movies) {

        if (movie.title!.length > 25) {
          movie.title = movie.title?.substring(0,26)+ "...";
        }

        if (movie.description!.length > 139) {
          movie.description = movie.description?.substring(0,130)+ "...";
        }

        movie.logo = movie.title?.charAt(0);
      }
  });
  }

  ngOnInit(): void {
    this.getMovies();
  }

}
