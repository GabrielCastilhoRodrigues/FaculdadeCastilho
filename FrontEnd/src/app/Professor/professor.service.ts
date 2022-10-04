import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Professor } from './Professor';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  url = 'https://localhost:7185/api/professor'

  constructor(private http: HttpClient){ }

  RetornaProfessores(): Observable<Professor[]>{
    return this.http.get<Professor[]>(this.url);
  }

  BuscaProfessor(numRegistro: number) : Observable<Professor>{
    const buscaUrl = `${this.url}/${numRegistro}`;
    return this.http.get<Professor>(buscaUrl);
  }

  CadastraProfessor(professor: Professor) : Observable<any>{
    return this.http.post<Professor>(this.url, professor, options);
  }

  AtualizaProfessor(professor: Professor) : Observable<any>{
    return this.http.put<Professor>(this.url, professor, options);
  }

  DeletaProfessor(numRegistro: number) : Observable<any>{
    const buscaUrl = `${this.url}`+'?numRegistro='+`${numRegistro}`;
    return this.http.delete<Professor>(buscaUrl)
  }
}
