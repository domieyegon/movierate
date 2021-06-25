import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IMovie, Movie } from 'src/app/model/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies?:IMovie[] = [];


  constructor(
    private apiService:ApiService
  ) { }




  ngOnInit(): void {

    this.apiService.getMovies().subscribe((res: HttpResponse<IMovie[]>) => (this.movies = res.body || []));
    
    // this.apiService.getMovies().subscribe(
    //   data => {
    //     console.log(data);
        
    //     this.movies = data;
    //   },
    //   error=> {
    //   console.log(error);
        
    //   }
    // );
  }

}
