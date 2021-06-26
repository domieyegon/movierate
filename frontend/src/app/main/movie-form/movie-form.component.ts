import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/app/model/movie';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  @Input() movie!:IMovie

  constructor() { }

  ngOnInit(): void {
  }

}
