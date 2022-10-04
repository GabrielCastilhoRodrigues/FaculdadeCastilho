import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Disciplina } from './Disciplina';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  url = 'https://localhost:7185/api/disciplina'

  constructor(private http: HttpClient){ }

  RetornaDisciplinas(): Observable<Disciplina[]>{
    return this.http.get<Disciplina[]>(this.url);
  }

  BuscaDisciplina(idDisciplina: number) : Observable<Disciplina>{
    const buscaUrl = `${this.url}/${idDisciplina}`;
    return this.http.get<Disciplina>(buscaUrl);
  }

  CadastraDisciplina(disciplina: Disciplina) : Observable<any>{
    return this.http.post<Disciplina>(this.url, disciplina, options);
  }

  AtualizaDisciplina(disciplina: Disciplina) : Observable<any>{
    return this.http.put<Disciplina>(this.url, disciplina, options);
  }

  DeletaDisciplina(idDisciplina: number) : Observable<any>{
    const buscaUrl = `${this.url}`+'?idDisciplina='+`${idDisciplina}`;
    return this.http.delete<Disciplina>(buscaUrl)
  }
}
