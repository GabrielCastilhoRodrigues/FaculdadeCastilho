import { FormGroup, FormControl } from '@angular/forms';
import { AlunoService } from './../../Aluno/aluno.service';
import { DisciplinaService } from './../../Disciplina/disciplina.service';
import { NotaService } from './../../Nota/nota.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Aluno } from './../../Aluno/Aluno';
import { Disciplina } from './../../Disciplina/Disciplina';
import { Nota } from './../../Nota/Nota';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {
  
  formulario: any;
  tituloFormulario!: string;
  notas!: Nota[];
  nota: Nota;
  idNota: number;
  idsNotas: number[] = [0]

  disciplinas!: Disciplina[];
  alunos!: Aluno[];
  nomeDisciplina: string;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;
  visibilidadeIdNota: boolean = true;
  atualizaCadastro: boolean = false;

  modal: BsModalRef;

  @ViewChild('exclusaoNota') content: TemplateRef<any>;

  constructor(private notaService: NotaService,
              private disciplinaService: DisciplinaService,
              private alunoService: AlunoService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.notaService.RetornaNotas().subscribe(result => {
      this.notas = result;
    })

    this.disciplinaService.RetornaDisciplinas().subscribe(result => {
      this.disciplinas = result;    
    });

    this.alunoService.RetornaAlunos().subscribe(result => {
      this.alunos = result;
    })
  }

  ExibirFormularioCadastro(): void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.visibilidadeIdNota= true;
    this.atualizaCadastro = false;
    const novoId = this.BuscaNovoId();

    this.tituloFormulario = "Nova Nota";
    this.formulario = new FormGroup({
      idNota: new FormControl(novoId),
      idDisciplina: new FormControl(null),
      numMatricula: new FormControl(null),
      nota: new FormControl(null)
    });
  }

  ExibirExcluirNota(idNota: number): void{
    this.modal = this.modalService.show(this.content);
    this.idNota = idNota;
  }

  ExibirFormularioAtualizacao(idNota: number): void {
    this.visibilidadeFormulario = true;
    this.visibilidadeTabela = false;
    this.visibilidadeIdNota = false;
    this.atualizaCadastro = true;

    this.notaService.BuscaNota(idNota).subscribe(result => {
      this.tituloFormulario = "Atualizar Disciplina";
      this.formulario = new FormGroup({
        idNota: new FormControl(result.idNota),
        idDisciplina: new FormControl(result.idDisciplina),
        numMatricula: new FormControl(result.numMatricula),
        nota: new FormControl(result.nota)
      });
    });
  }

  Voltar(): void{
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  EnviarNota(): void {
    const nota : Nota = this.formulario.value;

    if(this.atualizaCadastro) {
      this.notaService.AtualizaNota(nota).subscribe((result) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        this.visibilidadeIdNota = true;
  
        alert('Atualizado com sucesso!');

        this.notaService.RetornaNotas().subscribe((result) => {
          this.notas = result;
        });
      });  
    }
    else {
      this.notaService.CadastraNota(nota).subscribe((result) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;

        alert('Cadastro realizado com sucesso!');
        this.notaService.RetornaNotas().subscribe((result) => {
          this.notas = result;
        });
      });
    }
  }

  ExcluirNota(idNota: number): void {
    this.notaService.DeletaNota(idNota).subscribe(result => {
      this.modal?.hide();
      alert('Excluído com sucesso');

      this.notaService.RetornaNotas().subscribe(result => {
        this.notas = result;
      });
    });
  }

  BuscaNovoId(): number{
    this.notaService.RetornaNotas().subscribe(result => {
      this.notas = result;
    });

    for (let nota of this.notas.values()){
      this.idsNotas.push(nota.idNota);
    }

    const maiorId = Math.max.apply(null, this.idsNotas);

    return maiorId + 1;
  }
}
