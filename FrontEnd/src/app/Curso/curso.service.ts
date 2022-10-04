import { Curso } from './Curso';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  url = 'https://localhost:7185/api/curso'

  constructor(private http: HttpClient){ }

  RetornaCursos(): Observable<Curso[]>{
    return this.http.get<Curso[]>(this.url);
  }

  BuscaCurso(idCurso: number) : Observable<Curso>{
    const buscaUrl = `${this.url}/${idCurso}`;
    return this.http.get<Curso>(buscaUrl);
  }

  CadastraCurso(curso: Curso) : Observable<any>{
    return this.http.post<Curso>(this.url, curso, options);
  }

  AtualizaCurso(curso: Curso) : Observable<any>{
    return this.http.put<Curso>(this.url, curso, options);
  }

  DeletaCurso(idCurso: number) : Observable<any>{
    const buscaUrl = `${this.url}`+'?idCurso='+`${idCurso}`;
    return this.http.delete<Curso>(buscaUrl)
  }
}
