import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMovie } from 'src/app/model/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input() movies?:IMovie[] = [];

  @Output() selectMovie = new EventEmitter<IMovie>();

  constructor() { }

  movieClicked(movie:IMovie) {
    this.selectMovie.emit(movie)
  }

  ngOnInit(): void {}

}
