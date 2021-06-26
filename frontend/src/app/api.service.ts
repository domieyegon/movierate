import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http'
import { IMovie } from './model/movie';
import { Observable } from 'rxjs';
import { ILogin } from './model/login';

type EntityResponseType = HttpResponse<IMovie>;
type EntityArrayResponseType = HttpResponse<IMovie[]>;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "http://127.0.0.1:8000/"

  baseMovieUrl = `${this.baseUrl}api/movies/`

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 04b9fe87d913be3ad1a016543c716d5b3ed8a1d3'
  })

  
  // http://127.0.0.1:8000/api/movies/

  private movies = ['Terminator', 'Preditor'];

  constructor(
    private http:HttpClient
    ) { }

  loginUser(userData:ILogin): Observable<HttpResponse<ILogin>> {
    const body = JSON.stringify(userData);
    return this.http.post<ILogin>(`${this.baseUrl}auth/`, body, {headers:this.headers, observe: 'response'});
  }

  createMovie(title:string, description:string): Observable<EntityResponseType>{
    const body = JSON.stringify({title:title, description:description});
    return this.http.post<IMovie>(`${this.baseMovieUrl}`, body, {headers: this.headers, observe: 'response'})
  }

  updateMovie(id: number, title:string, description:string): Observable<EntityResponseType>{
    const body = JSON.stringify({id:id,title:title, description:description});
    return this.http.put<IMovie>(`${this.baseMovieUrl}${id}/`, body, {headers: this.headers, observe: 'response'})
  }

  rateMovie(rate:number, movieId:number): Observable<EntityResponseType> {
    const body = JSON.stringify({"stars": rate});
    return this.http.post<IMovie>(`${this.baseMovieUrl}${movieId}/rate_movie/`, body, {headers: this.headers, observe: 'response'});
  }

  getMovie(id:number): Observable<EntityResponseType> {
    return this.http.get<IMovie>(`${this.baseMovieUrl}${id}/`, {headers:this.headers, observe: 'response'});
  }

  getMovies(): Observable<EntityArrayResponseType> {
    return this.http.get<IMovie[]>(this.baseMovieUrl, {headers:this.headers, observe: 'response'});
  }

  deleteMovie(id:number): Observable<EntityResponseType> {
    return this.http.delete<IMovie>(`${this.baseMovieUrl}${id}/`, {headers:this.headers, observe:"response"});
  }
}
