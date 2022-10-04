import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Aluno } from './Aluno';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  url = 'https://localhost:7185/api/aluno'

  constructor(private http: HttpClient){ }

  RetornaAlunos(): Observable<Aluno[]>{
    return this.http.get<Aluno[]>(this.url);
  }

  BuscaAluno(numMatricula: number) : Observable<Aluno>{
    const buscaUrl = `${this.url}/${numMatricula}`;
    return this.http.get<Aluno>(buscaUrl);
  }

  CadastraAluno(aluno: Aluno) : Observable<any>{
    return this.http.post<Aluno>(this.url, aluno, options);
  }

  AtualizaAluno(aluno: Aluno) : Observable<any>{
    return this.http.put<Aluno>(this.url, aluno, options);
  }

  DeletaAluno(numMatricula: number) : Observable<any>{
    const buscaUrl = `${this.url}`+'?numMatricula='+`${numMatricula}`;
    return this.http.delete<Aluno>(buscaUrl)
  }
}