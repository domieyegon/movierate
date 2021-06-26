import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';
import { IMovie } from 'src/app/model/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie!:IMovie;
  @Output() updateMovie = new EventEmitter();

  faCoffee = faCoffee;
  faStar = faStar;

  rateHovered = 0;

  constructor(
    private apiService:ApiService
  ) { }

  rateHover(rate:number) {
   this.rateHovered = rate;
  }

  rateCLicked(rate:number) {
    this.apiService.rateMovie(rate, this.movie.id).subscribe((res: HttpResponse<IMovie>)=>(this.getDetails(), console.log(res)));
  }

  getDetails() {
    this.apiService.getMovie(this.movie.id).subscribe((res: HttpResponse<IMovie>)=>(this.updateMovie.emit(res.body)));
  }

  ngOnInit(): void {}

}
