import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  @Output() movieCreated = new EventEmitter<IMovie>();
  @Output() movieUpdated = new EventEmitter<IMovie>();

  @Input() set movie(val:IMovie){
    this.id= val.id;
    console.log(this.id);
    this.movieForm = new FormGroup({
      title: new FormControl(val.title),
      description: new FormControl(val.description)
    });
  }


  constructor(
    private apiService:ApiService,
    private dialogRef: MatDialogRef<MovieFormComponent>,
    @Inject(MAT_DIALOG_DATA) public movieData: IMovie
  ) {
    this.id= movieData.id;
    console.log(this.id);
    this.movieForm = new FormGroup({
      title: new FormControl(movieData.title),
      description: new FormControl(movieData.description)
    })

   }

  saveMovie() {
    if(this.id == undefined){
      this.apiService.createMovie(this.movieForm.value.title, this.movieForm.value.description).subscribe((res: HttpResponse<IMovie>)=>( this.movieCreated.emit(res.body!), this.dialogRef.close(), console.log(res)));
    }else{
      this.apiService.updateMovie(this.id!, this.movieForm.value.title, this.movieForm.value.description).subscribe((res: HttpResponse<IMovie>)=>(this.movieUpdated.emit(res.body!), this.dialogRef.close(), console.log(res)));
    }

    console.log(this.movieForm.value);
  }

  formDisabled() {
    if( this.movieForm.value.title.length &&  this.movieForm.value.description.length) {
      return false;
    } else {
      return true
    }
  }

  ngOnInit(): void {
  }

}
