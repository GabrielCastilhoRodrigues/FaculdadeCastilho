import { PrincipalComponent } from './Components/principal/principal.component';
import { NotaComponent } from './Components/nota/nota.component';
import { ProfessorComponent } from './Components/professor/professor.component';
import { DisciplinaComponent } from './Components/disciplina/disciplina.component';
import { AlunoComponent } from './Components/aluno/aluno.component';
import { CursoComponent } from './Components/curso/curso.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: 'curso', component: CursoComponent
},
{
  path: 'aluno', component: AlunoComponent
},
{
  path: 'disciplina', component: DisciplinaComponent
},
{
  path: 'professor', component: ProfessorComponent
},
{
  path: 'nota', component: NotaComponent
},
{
  path: '', component: PrincipalComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
