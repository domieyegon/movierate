import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { ApplicationSettings } from '@nativescript/core';
import { ApiService } from '../api.service';
import { LoginInput } from '../model/LoginInput';
import { IMovie, Movie } from '../model/movie';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  movie:IMovie = new Movie();

  isEditing: boolean = false;
  id;

  constructor(
    private apiService:ApiService,
    private router:RouterExtensions,
    private route:ActivatedRoute,
  ) { }

  // saveMovie() {
  //   if(this.id == undefined){
  //     this.apiService.createMovie(this.movieForm.value.title, this.movieForm.value.description).subscribe((res: HttpResponse<IMovie>)=>( this.movieCreated.emit(res.body!), console.log(res)));
  //   }else{
  //     this.apiService.updateMovie(this.id!, this.movieForm.value.title, this.movieForm.value.description).subscribe((res: HttpResponse<IMovie>)=>(this.movieUpdated.emit(res.body!), console.log(res)));
  //   }

  //   console.log(this.movieForm.value);
  // }

  // formDisabled() {
  //   if( this.movieForm.value.title.length &&  this.movieForm.value.description.length) {
  //     return false;
  //   } else {
  //     return true
  //   }
  // }

  saveMovie(){
    if (!this.id) {
      this.apiService.createMovie(this.movie.title, this.movie.description).subscribe((res: HttpResponse<IMovie>)=> (this.router.navigate(['/movies'], {clearHistory:true})));
    } else {
      this.apiService.updateMovie(this.movie.id, this.movie.title, this.movie.description).subscribe((res: HttpResponse<IMovie>) => (this.router.navigate(['/movies'], {clearHistory:true})));
    }
  }


  logout() {
    ApplicationSettings.remove('mr-token');
    this.router.navigate(['/login'], {clearHistory: true});
  }
  ngOnInit(): void {

    const id = +this.route.snapshot.params['id'];
    this.id = id;
    if (id) {
      this.isEditing = true;
      this.apiService.getMovie(id).subscribe((res: HttpResponse<IMovie>)=>(this.movie = res.body, console.log(this.movie)))
    } else {
      this.isEditing = false;
    }
    console.log(this.isEditing);
  }

}
