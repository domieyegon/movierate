import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http'
import { IMovie } from './model/movie';
import { Observable } from 'rxjs';

type EntityArrayResponseType = HttpResponse<IMovie[]>;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "http://127.0.0.1:8000/api/movies/"

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 04b9fe87d913be3ad1a016543c716d5b3ed8a1d3'
  })

  
  // http://127.0.0.1:8000/api/movies/

  private movies = ['Terminator', 'Preditor'];

  constructor(
    private httpClient:HttpClient
    ) { }

  // getMovies() {
  //   return this.httpClient.get(this.baseUrl, {headers:this.headers});
  // }

  getMovies(): Observable<EntityArrayResponseType> {
    return this.httpClient.get<IMovie[]>(this.baseUrl, {headers:this.headers, observe: 'response'});
  }
}
