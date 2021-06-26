import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { IMovie } from 'src/app/model/movie';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  movieForm:any
  id: number | undefined;

  @Input() set movie(val:IMovie){
    this.id= val.id;
    console.log(this.id);
    this.movieForm = new FormGroup({
      title: new FormControl(val.title),
      description: new FormControl(val.description)
    });
  }


  constructor(
    private apiService:ApiService
  ) { }

  saveMovie() {
    if(this.id == undefined){
      console.log(this.id);
      console.log("You are adding a new one")
      this.apiService.createMovie(this.movieForm.value.title, this.movieForm.value.description).subscribe((res: HttpResponse<IMovie>)=>(console.log(res)));
    }else{

      console.log("You are Updating")
      this.apiService.updateMovie(this.id!, this.movieForm.value.title, this.movieForm.value.description).subscribe((res: HttpResponse<IMovie>)=>(console.log(res)));
    }
    
    console.log(this.movieForm.value);
  }

  ngOnInit(): void {
  }

}
