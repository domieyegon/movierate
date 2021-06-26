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
      description: ''
    }

    this.isEditMovie = true;
  }

  deletedMovie(movie:IMovie) {
    this.apiService.deleteMovie(movie.id!).subscribe((res: HttpResponse<IMovie>)=>(console.log(res.body)));
  }

  ngOnInit(): void {

    this.apiService.getMovies().subscribe((res: HttpResponse<IMovie[]>) => (this.movies = res.body || []));

  }

}
