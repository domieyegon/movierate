import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { ApplicationSettings } from '@nativescript/core';
import { ApiService } from '../api.service';
import { IMovie } from '../model/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie?:IMovie;
  // @Output() updateMovie = new EventEmitter();

  yourRate:number = 0;
  // rateHovered = 0;

  constructor(
    private apiService:ApiService,
    private route:ActivatedRoute,
    private router:RouterExtensions
  ) { }

  // rateHover(rate:number) {
  //  this.rateHovered = rate;
  // }

  // rateCLicked(rate:number) {
  //   this.apiService.rateMovie(rate, this.movie.id!).subscribe((res: HttpResponse<IMovie>)=>(this.getDetails(), console.log(res)));
  // }

  // getDetails() {
  //   this.apiService.getMovie(this.movie.id!).subscribe((res: HttpResponse<IMovie>)=>(this.updateMovie.emit(res.body)));
  // }

  rateClicked(rate: number) {
    this.yourRate = rate;
    this.apiService.rateMovie(rate, this.movie.id).subscribe((res: HttpResponse<IMovie>)=>(this.getMovie(), console.log(res.body)))
  }

  editMovie() {
    this.router.navigate(['/movie', this.movie.id, 'edit']);
  }

  deleteMovie(){
    this.apiService.deleteMovie(this.movie.id).subscribe((res: HttpResponse<IMovie>)=>(this.router.navigate(['/movies'])));
  }

  logout() {
    ApplicationSettings.remove('mr-token');
    this.router.navigate(['/login'], {clearHistory: true});
  }

  getMovie() {
    const id  = +this.route.snapshot.params['id'];
    this.apiService.getMovie(id).subscribe(
      (res: HttpResponse<IMovie>) => (
        this.movie = res.body,
        console.log(this.movie)
      )
    );
  }

  ngOnInit(): void {
    // const id2 = +this.route.snapshot.params['id'];
    this.getMovie();
  }

}
