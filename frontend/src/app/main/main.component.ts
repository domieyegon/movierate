import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  isEditMovie: Boolean = false;

  constructor(
    private apiService: ApiService
  ) { }

  selectMovie(movie: IMovie) {
    this.selectedMovie = movie;
    console.log('selectedMovie ', this.selectedMovie);
    this.isEditMovie = false;
  }

  editMovie(movie: IMovie) {
    this.editedMovie = movie;
    this.isEditMovie = true;
  }

  createNewMovie() {
    this.editedMovie = {
      title:'',
      description: '',
      avg_ratings: 0,
      id: 0
    }

    this.isEditMovie = true;
  }

  deletedMovie(movie:IMovie) {
    console.log('delete', movie.title);
  }

  ngOnInit(): void {

    this.apiService.getMovies().subscribe((res: HttpResponse<IMovie[]>) => (this.movies = res.body || []));

  }

}
