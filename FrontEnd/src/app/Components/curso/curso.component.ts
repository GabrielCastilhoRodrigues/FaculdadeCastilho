import { CursoService } from './../../Curso/curso.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Curso } from 'src/app/Curso/Curso';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})

export class CursoComponent implements OnInit {

  formulario: any;
  tituloFormulario!: string;
  cursos!: Curso[];
  nome: string;
  idCurso: number;
  idsCursos: number[] = [0];

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;
  visibilidadeIdCurso: boolean = true;
  atualizaCadastro: boolean = false;

  modal: BsModalRef;

  @ViewChild('exclusaoCurso') content: TemplateRef<any>;

  constructor(private cursoService: CursoService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.cursoService.RetornaCursos().subscribe(result => {
      this.cursos = result;
    });
  }

  ExibirFormularioCadastro(): void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.visibilidadeIdCurso = true;
    this.atualizaCadastro = false;
    const novoId = this.BuscaNovoId();

    this.tituloFormulario = "Novo Curso";
    this.formulario = new FormGroup({
      idCurso: new FormControl(novoId),
      nome: new FormControl(null)
    });
  }

  ExibirExcluirCurso(idCurso: number, nome: string): void{
    this.modal = this.modalService.show(this.content);
    this.idCurso = idCurso;
    this.nome = nome;
  }

  ExibirFormularioAtualizacao(cursoId: number): void {
    this.visibilidadeFormulario = true;
    this.visibilidadeTabela = false;
    this.visibilidadeIdCurso = false;
    this.atualizaCadastro = true;

    this.cursoService.BuscaCurso(cursoId).subscribe(result => {
      this.tituloFormulario = "Atualizar Curso";
      this.formulario = new FormGroup({
        idCurso: new FormControl(result.idCurso),
        nome: new FormControl(result.nome)
      });
    });
  }

  Voltar(): void{
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  EnviarCurso(): void {
    const curso : Curso = this.formulario.value;

    if(this.atualizaCadastro) {
      this.cursoService.AtualizaCurso(curso).subscribe((result) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        this.visibilidadeIdCurso = true;
  
        alert('Atualizado com sucesso!');
  
        this.cursoService.RetornaCursos().subscribe((result) => {
          this.cursos = result;
        });
      });  
    }
    else {
      this.cursoService.CadastraCurso(curso).subscribe((result) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;

        alert('Cadastro realizado com sucesso!');

        this.cursoService.RetornaCursos().subscribe((result) => {
          this.cursos = result;
        });
      });
    }
  }

  ExcluirCurso(idCurso: number): void {
    this.cursoService.DeletaCurso(idCurso).subscribe(result => {
      this.modal?.hide();
      alert('Excluído com sucesso');
      this.cursoService.RetornaCursos().subscribe(result => {
        this.cursos = result;
      });
    });
  }

  BuscaNovoId(): number{
    this.cursoService.RetornaCursos().subscribe(result => {
      this.cursos = result;
    });

    for (let curso of this.cursos.values()){
      this.idsCursos.push(curso.idCurso);
    }
    
    const maiorId = Math.max.apply(null, this.idsCursos);

    return maiorId + 1;
  }
}