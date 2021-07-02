import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEdit, faPlus, faStar, faTh, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';
import { IMovie } from 'src/app/model/movie';

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
    private apiService:ApiService
  ) { }

  movieClicked(movie:IMovie) {
    this.selectMovie.emit(movie)
  }

  editMovie(movie:IMovie) {
    this.editedMovie.emit(movie);
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
        this.rateHovered = rate;
      }
    }
   }

   rateCLicked(rate:number, movieId: number) {
     this.apiService.rateMovie(rate, movieId).subscribe((res: HttpResponse<IMovie>)=>(this.getMovies(), console.log(res)));
   }

  deleteMovie(movie:IMovie) {
    this.deletedMovie.emit(movie);
  }

  getMovies() {
    this.apiService.getMovies().subscribe((res: HttpResponse<IMovie[]>) =>(
      this.movies = res.body || []
    ));
  }

  ngOnInit(): void {

  }

}
