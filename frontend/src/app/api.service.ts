import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { IMovie } from './model/movie';
import { Observable } from 'rxjs';
import { ILogin } from './model/login';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MovieFormComponent } from './main/movie-form/movie-form.component';

type EntityResponseType = HttpResponse<IMovie>;
type EntityArrayResponseType = HttpResponse<IMovie[]>;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.apiUrl;

  baseMovieUrl = `${this.baseUrl}api/movies/`;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private dialog: MatDialog,
  ) {}

  openDialog(movie: IMovie): Observable<IMovie> {
    const dialogRef = this.dialog.open(MovieFormComponent, { data: movie, width: '600px' });

    return dialogRef.afterClosed();

  }



  loginUser(userData: ILogin): Observable<HttpResponse<ILogin>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify(userData);
    return this.http.post<ILogin>(`${this.baseUrl}auth/`, body, {
      headers: headers,
      observe: 'response',
    });
  }

  registerUser(userData: ILogin): Observable<HttpResponse<ILogin>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify(userData);
    return this.http.post<ILogin>(`${this.baseUrl}api/users/`, body, {
      headers: headers,
      observe: 'response',
    });
  }

  createMovie(
    title: string,
    description: string
  ): Observable<EntityResponseType> {
    const body = JSON.stringify({ title: title, description: description });
    return this.http.post<IMovie>(`${this.baseMovieUrl}`, body, {
      headers: this.getAuthToken(),
      observe: 'response',
    });
  }

  updateMovie(
    id: number,
    title: string,
    description: string
  ): Observable<EntityResponseType> {
    const body = JSON.stringify({
      id: id,
      title: title,
      description: description,
    });
    return this.http.put<IMovie>(`${this.baseMovieUrl}${id}/`, body, {
      headers: this.getAuthToken(),
      observe: 'response',
    });
  }

  rateMovie(rate: number, movieId: number): Observable<EntityResponseType> {
    const body = JSON.stringify({ stars: rate });
    return this.http.post<IMovie>(
      `${this.baseMovieUrl}${movieId}/rate_movie/`,
      body,
      { headers: this.getAuthToken(), observe: 'response' }
    );
  }

  getMovie(id: number): Observable<EntityResponseType> {
    return this.http.get<IMovie>(`${this.baseMovieUrl}${id}/`, {
      headers: this.getAuthToken(),
      observe: 'response',
    });
  }

  getMovies(): Observable<EntityArrayResponseType> {
    return this.http.get<IMovie[]>(this.baseMovieUrl, {
      headers: this.getAuthToken(),
      observe: 'response',
    });
  }

  deleteMovie(id: number): Observable<EntityResponseType> {
    return this.http.delete<IMovie>(`${this.baseMovieUrl}${id}/`, {
      headers: this.getAuthToken(),
      observe: 'response',
    });
  }

  getAuthToken() {
    const token = this.cookieService.get('mr-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });
  }
}
