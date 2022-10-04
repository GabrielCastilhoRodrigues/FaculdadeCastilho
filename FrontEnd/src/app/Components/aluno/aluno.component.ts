import { AlunoService } from './../../Aluno/aluno.service';
import { Aluno } from './../../Aluno/Aluno';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  formulario: any;
  tituloFormulario!: string;
  alunos!: Aluno[];
  nome: string;
  numMatricula: number;
  dataNascimento: Date;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;
  visibilidadeNumMatricula: boolean = true;
  atualizaCadastro: boolean = false;

  modal: BsModalRef;

  @ViewChild('exclusaoAluno') content: TemplateRef<any>;

  constructor(private alunoService: AlunoService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.alunoService.RetornaAlunos().subscribe(result => {
      this.alunos = result;
    });
  }

  ExibirFormularioCadastro(): void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.visibilidadeNumMatricula = true;
    this.atualizaCadastro = false;

    this.tituloFormulario = "Novo Aluno";
    this.formulario = new FormGroup({
      numMatricula: new FormControl(null),
      nome: new FormControl(null),
      dataNascimento: new FormControl(null)
    });
  }

  ExibirExcluirAluno(numMatricula: number, nome: string, dataNascimento: Date): void{
    this.modal = this.modalService.show(this.content);
    this.numMatricula = numMatricula;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
  }

  ExibirFormularioAtualizacao(numMatricula: number): void {
    this.visibilidadeFormulario = true;
    this.visibilidadeTabela = false;
    this.visibilidadeNumMatricula = false;
    this.atualizaCadastro = true;

    this.alunoService.BuscaAluno(numMatricula).subscribe(result => {
      const datepipe: DatePipe = new DatePipe('en-US');
      const dataNascimento = datepipe.transform(result.dataNascimento, 'yyyy-MM-dd');

      this.tituloFormulario = "Atualizar Aluno";
      this.formulario = new FormGroup({
        numMatricula: new FormControl(result.numMatricula),
        nome: new FormControl(result.nome),
        dataNascimento: new FormControl(dataNascimento)
      });
    });
  }

  Voltar(): void{
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  EnviarAluno(): void {
    const aluno : Aluno = this.formulario.value;

    if(this.atualizaCadastro) {
      this.alunoService.AtualizaAluno(aluno).subscribe((result) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        this.visibilidadeNumMatricula = true;
  
        alert('Atualizado com sucesso!');

        this.alunoService.RetornaAlunos().subscribe((result) => {
          this.alunos = result;
        });
      });  
    }
    else {
      this.alunoService.CadastraAluno(aluno).subscribe((result) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;

        alert('Cadastro realizado com sucesso!');
        this.alunoService.RetornaAlunos().subscribe((result) => {
          this.alunos = result;
        });
      });
    }
  }

  ExcluirAluno(numMatricula: number): void {
    this.alunoService.DeletaAluno(numMatricula).subscribe(result => {
      this.modal?.hide();
      alert('Excluído com sucesso');
      this.alunoService.RetornaAlunos().subscribe(result => {
        this.alunos = result;
      });
    });
  }
}
