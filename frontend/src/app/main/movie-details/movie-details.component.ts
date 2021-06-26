import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/app/model/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie?:IMovie

  constructor() { }

  ngOnInit(): void {
  }

}
