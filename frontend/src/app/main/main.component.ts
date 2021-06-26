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

  movies?:IMovie[] = [];
  selectedMovie = null;

  constructor(
    private apiService:ApiService
  ) { }

  ngOnInit(): void {

    this.apiService.getMovies().subscribe((res: HttpResponse<IMovie[]>) => (this.movies = res.body || []));
    
  }

}
