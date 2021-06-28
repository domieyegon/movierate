import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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


  // rateHovered = 0;

  constructor(
    private apiService:ApiService,
    private route:ActivatedRoute
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

  ngOnInit(): void {
    const id  = +this.route.snapshot.params.id;
    this.apiService.getMovie(id).subscribe(
      (res: HttpResponse<IMovie>) => (
        this.movie = res.body,
        console.log(this.movie)
      )
    );
  }

}
