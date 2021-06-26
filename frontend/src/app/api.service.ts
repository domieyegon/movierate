import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http'
import { IMovie } from './model/movie';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IMovie>;
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
    private http:HttpClient
    ) { }

  // getMovies() {
  //   return this.httpClient.get(this.baseUrl, {headers:this.headers});
  // }

  createMovie(title:string, description:string): Observable<EntityResponseType>{
    const body = JSON.stringify({title:title, description:description});
    return this.http.post<IMovie>(`${this.baseUrl}`, body, {headers: this.headers, observe: 'response'})
  }

  updateMovie(id: number, title:string, description:string): Observable<EntityResponseType>{
    const body = JSON.stringify({id:id,title:title, description:description});
    return this.http.put<IMovie>(`${this.baseUrl}${id}`, body, {headers: this.headers, observe: 'response'})
  }

  rateMovie(rate:number, movieId:number): Observable<EntityResponseType> {
    const body = JSON.stringify({"stars": rate});
    return this.http.post<IMovie>(`${this.baseUrl}${movieId}/rate_movie/`, body, {headers: this.headers, observe: 'response'})
  }

  getMovie(id:number): Observable<EntityResponseType> {
    return this.http.get<IMovie>(`${this.baseUrl}${id}/`, {headers:this.headers, observe: 'response'});
  }

  getMovies(): Observable<EntityArrayResponseType> {
    return this.http.get<IMovie[]>(this.baseUrl, {headers:this.headers, observe: 'response'});
  }
}
