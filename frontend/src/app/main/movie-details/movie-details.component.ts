import { Component, Input, OnInit } from '@angular/core';
import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons';
import { IMovie } from 'src/app/model/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie?:IMovie

  faCoffee = faCoffee
  faStar = faStar

  constructor() { }

  ngOnInit(): void {
  }

}
