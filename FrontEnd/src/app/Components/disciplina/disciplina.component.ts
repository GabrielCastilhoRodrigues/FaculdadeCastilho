import { ProfessorService } from './../../Professor/professor.service';
import { CursoService } from './../../Curso/curso.service';
import { Professor } from './../../Professor/Professor';
import { Curso } from 'src/app/Curso/Curso';
import { FormGroup, FormControl } from '@angular/forms';
import { DisciplinaService } from './../../Disciplina/disciplina.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Disciplina } from './../../Disciplina/Disciplina';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {

  formulario: any;
  tituloFormulario!: string;
  disciplinas!: Disciplina[];
  nome: string;
  idDisciplina: number;
  idsDisciplinas: number[] = [0]

  cursos!: Curso[];
  professores!: Professor[];

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;
  visibilidadeIdDisciplina: boolean = true;
  atualizaCadastro: boolean = false;

  modal: BsModalRef;

  @ViewChild('exclusaoDisciplina') content: TemplateRef<any>;

  constructor(private disciplinaService: DisciplinaService,
              private cursosService: CursoService,
              private professorService: ProfessorService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.disciplinaService.RetornaDisciplinas().subscribe(result => {
      this.disciplinas = result;
    });

    this.cursosService.RetornaCursos().subscribe(result => {
      this.cursos = result;
    })

    this.professorService.RetornaProfessores().subscribe(result => {
      this.professores = result;
    })
  }

  ExibirFormularioCadastro(): void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.visibilidadeIdDisciplina = true;
    this.atualizaCadastro = false;
    const novoId = this.BuscaNovoId();

    this.tituloFormulario = "Novo Professsor";
    this.formulario = new FormGroup({
      idDisciplina: new FormControl(novoId),
      idCurso: new FormControl(null),
      numRegistro: new FormControl(null),
      nome: new FormControl(null)
    });
  }

  ExibirExcluirDisciplina(idDisciplina: number, nome: string): void{
    this.modal = this.modalService.show(this.content);
    this.idDisciplina = idDisciplina;
    this.nome = nome;
  }

  ExibirFormularioAtualizacao(idDisciplina: number): void {
    this.visibilidadeFormulario = true;
    this.visibilidadeTabela = false;
    this.visibilidadeIdDisciplina = false;
    this.atualizaCadastro = true;

    this.disciplinaService.BuscaDisciplina(idDisciplina).subscribe(result => {
      this.tituloFormulario = "Atualizar Disciplina";
      this.formulario = new FormGroup({
        idDisciplina: new FormControl(result.idDisciplina),
        idCurso: new FormControl(result.idCurso),
        numRegistro: new FormControl(result.numRegistro),
        nome: new FormControl(result.nome)
      });
    });
  }

  Voltar(): void{
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  EnviarDisciplina(): void {
    const disciplina : Disciplina = this.formulario.value;

    if(this.atualizaCadastro) {
      this.disciplinaService.AtualizaDisciplina(disciplina).subscribe((result) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        this.visibilidadeIdDisciplina = true;
  
        alert('Atualizado com sucesso!');

        this.disciplinaService.RetornaDisciplinas().subscribe((result) => {
          this.disciplinas = result;
        });
      });  
    }
    else {
      this.disciplinaService.CadastraDisciplina(disciplina).subscribe((result) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;

        alert('Cadastro realizado com sucesso!');
        this.disciplinaService.RetornaDisciplinas().subscribe((result) => {
          this.disciplinas = result;
        });
      });
    }
  }

  ExcluirDisciplina(idDisciplina: number): void {
    this.disciplinaService.DeletaDisciplina(idDisciplina).subscribe(result => {
      this.modal?.hide();
      alert('Excluído com sucesso');

      this.disciplinaService.RetornaDisciplinas().subscribe(result => {
        this.disciplinas = result;
      });
    });
  }

  BuscaNovoId(): number{
    this.disciplinaService.RetornaDisciplinas().subscribe(result => {
      this.disciplinas = result;
    });

    for (let disciplina of this.disciplinas.values()){
      this.idsDisciplinas.push(disciplina.idDisciplina);
    }

    const maiorId = Math.max.apply(null, this.idsDisciplinas);

    return maiorId + 1;
  }
}
