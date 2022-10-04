import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CursoService } from './Curso/curso.service';
import { CursoComponent } from './Components/curso/curso.component';

import { ProfessorService } from './Professor/professor.service';
import { ProfessorComponent } from './Components/professor/professor.component';

import { NotaService } from './Nota/nota.service';
import { NotaComponent } from './Components/nota/nota.component';

import { DisciplinaService } from './Disciplina/disciplina.service';
import { DisciplinaComponent } from './Components/disciplina/disciplina.component';

import { AlunoService } from './Aluno/aluno.service';
import { AlunoComponent } from './Components/aluno/aluno.component';
import { PrincipalComponent } from './Components/principal/principal.component';

@NgModule({
  declarations: [
    AppComponent,
    CursoComponent,
    AlunoComponent,
    ProfessorComponent,
    NotaComponent,
    DisciplinaComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    HttpClientModule,
    CursoService,
    AlunoService,
    DisciplinaService,
    NotaService,
    ProfessorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
