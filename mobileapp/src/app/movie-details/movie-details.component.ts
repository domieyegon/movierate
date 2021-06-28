import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  // @Input() movie!:IMovie;
  // @Output() updateMovie = new EventEmitter();


  // rateHovered = 0;

  constructor(
    // private apiService:ApiService
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

  ngOnInit(): void {}

}
