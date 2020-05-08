import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';

let pais = 'us';
const url = 'http://newsapi.org/v2/top-headlines';
let urlPais = '?country=' + pais;
const headers = new HttpHeaders({
  'X-Api-key': environment.apiKey
});

@Injectable({
  providedIn: 'root'
})

export class NoticiasService {

  headlinesPage = 0;
  categoriaActual = '';
  categoritaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = url + urlPais + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`&page=${this.headlinesPage}`);

  }

  getTopHeadlinesCategoria(categoria: string) {
    if (this.categoriaActual === categoria) {
      this.categoritaPage++;
    } else {
      this.categoritaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`&category=${categoria}&page=${this.categoritaPage}`);
  }





}
