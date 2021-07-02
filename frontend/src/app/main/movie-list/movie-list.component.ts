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


  constructor(
    private apiServive:ApiService
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
    this.apiServive.openDialog(movie);
    // this.createNewMovie.emit();
  }

  deleteMovie(movie:IMovie) {
    this.deletedMovie.emit(movie);
  }

  ngOnInit(): void {}

}
