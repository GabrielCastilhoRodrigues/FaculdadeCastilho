import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Nota } from './Nota';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  url = 'https://localhost:7185/api/nota'

  constructor(private http: HttpClient){ }

  RetornaNotas(): Observable<Nota[]>{
    return this.http.get<Nota[]>(this.url);
  }

  BuscaNota(idNota: number) : Observable<Nota>{
    const buscaUrl = `${this.url}/${idNota}`;
    return this.http.get<Nota>(buscaUrl);
  }

  CadastraNota(nota: Nota) : Observable<any>{
    return this.http.post<Nota>(this.url, nota, options);
  }

  AtualizaNota(nota: Nota) : Observable<any>{
    return this.http.put<Nota>(this.url, nota, options);
  }

  DeletaNota(idNota: number) : Observable<any>{
    const buscaUrl = `${this.url}`+'?idNota='+`${idNota}`;
    return this.http.delete<Nota>(buscaUrl)
  }
}