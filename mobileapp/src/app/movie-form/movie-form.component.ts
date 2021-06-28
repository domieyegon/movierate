import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { ApplicationSettings } from '@nativescript/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {


  constructor(
    private apiService:ApiService,
    private router:RouterExtensions
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


  logout() {
    ApplicationSettings.remove('mr-token');
    this.router.navigate(['/login'], {clearHistory: true});
  }
  ngOnInit(): void {
  }

}
