import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ApplicationSettings } from '@nativescript/core';
import { ApiService } from '../api.service';
import { IMovie } from '../model/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  items:IMovie[] = [];

  constructor(
    private apiService: ApiService,
    private router: RouterExtensions
  ) { }

  addMovie() {
    this.router.navigate(['/movie/new']);
  }

  logout() {
    ApplicationSettings.remove('mr-token');
    this.router.navigate(['/login'], {clearHistory: true});
  }

  ngOnInit(): void {
    this.apiService.getMovies().subscribe(
      (res: HttpResponse<IMovie[]>)=>(
        this.items = res.body
      )
    )
  }

}
