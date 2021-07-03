import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { IMovie } from 'src/app/model/movie';

@Component({
  selector: 'app-movie-delete-dialog',
  templateUrl: './movie-delete-dialog.component.html',
  styleUrls: ['./movie-delete-dialog.component.css']
})
export class MovieDeleteDialogComponent implements OnInit {

  @Output() movieDeleted = new EventEmitter<IMovie>();

  movie!:IMovie

  constructor(
    private apiService:ApiService,
    private dialogRef:MatDialogRef<MovieDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data:IMovie
    ) {
    this.movie = data;
    console.log(this.movie)
   }

   deleteMovie() {
     this.apiService.deleteMovie(77).subscribe((res:HttpResponse<IMovie>)=>{
       console.log(res.body);
       this.dialogRef.close();
      //  this.movieDeleted.emit(res.body!);
     })
   }

  ngOnInit(): void {
  }

}
