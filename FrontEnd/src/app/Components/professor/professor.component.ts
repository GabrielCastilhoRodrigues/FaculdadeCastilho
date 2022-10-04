import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfessorService } from './../../Professor/professor.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from './../../Professor/Professor';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {
  formulario: any;
  tituloFormulario!: string;
  professores!: Professor[];
  nome: string;
  numRegistro: number;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;
  visibilidadeNumRegistro: boolean = true;
  atualizaCadastro: boolean = false;

  modal: BsModalRef;

  @ViewChild('exclusaoProfessor') content: TemplateRef<any>;

  constructor(private professorService: ProfessorService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.professorService.RetornaProfessores().subscribe(result => {
      this.professores = result;
    });
  }

  ExibirFormularioCadastro(): void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.visibilidadeNumRegistro = true;
    this.atualizaCadastro = false;

    this.tituloFormulario = "Novo Professsor";
    this.formulario = new FormGroup({
      numRegistro: new FormControl(null),
      nome: new FormControl(null),
      dataNascimento: new FormControl(null),
      salario: new FormControl(null)
    });
  }

  ExibirExcluirProfessor(numRegistro: number, nome: string): void{
    this.modal = this.modalService.show(this.content);
    this.numRegistro = numRegistro;
    this.nome = nome;
  }

  ExibirFormularioAtualizacao(numRegistro: number): void {
    this.visibilidadeFormulario = true;
    this.visibilidadeTabela = false;
    this.visibilidadeNumRegistro = false;
    this.atualizaCadastro = true;

    this.professorService.BuscaProfessor(numRegistro).subscribe(result => {
      const datepipe: DatePipe = new DatePipe('en-US');
      const dataNascimento = datepipe.transform(result.dataNascimento, 'yyyy-MM-dd');

      this.tituloFormulario = "Atualizar Professor";
      this.formulario = new FormGroup({
        numRegistro: new FormControl(result.numRegistro),
        nome: new FormControl(result.nome),
        dataNascimento: new FormControl(dataNascimento),
        salario: new FormControl(result.salario)
      });
    });
  }

  Voltar(): void{
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  EnviarProfessor(): void {
    const professor : Professor = this.formulario.value;

    if(this.atualizaCadastro) {
      this.professorService.AtualizaProfessor(professor).subscribe((result) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        this.visibilidadeNumRegistro = true;
  
        alert('Atualizado com sucesso!');

        this.professorService.RetornaProfessores().subscribe((result) => {
          this.professores = result;
        });
      });  
    }
    else {
      this.professorService.CadastraProfessor(professor).subscribe((result) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;

        alert('Cadastro realizado com sucesso!');
        this.professorService.RetornaProfessores().subscribe((result) => {
          this.professores = result;
        });
      });
    }
  }

  ExcluirProfessor(numRegistro: number): void {
    this.professorService.DeletaProfessor(numRegistro).subscribe(result => {
      this.modal?.hide();
      alert('Excluído com sucesso');
      this.professorService.RetornaProfessores().subscribe(result => {
        this.professores = result;
      });
    });
  }
}
