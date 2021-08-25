import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../common/usuario';
import { Turma } from '../../../../common/turma';
import { Professor } from '../../../../common/professor';
import { CriarTurmaService } from './criar_turma.service';
import { Router } from '@angular/router';

@Component({
    selector: 'criar_turma',
    templateUrl: './criar_turma.component.html',
    styleUrls: ['./criar_turma.component.css']
  })


  
export class CriarTurmaComponent {

    notificacaoClasses: {} = {};
    notificacaoTexto: String = '';
    professor = new Professor('', '', '', '');

    constructor(private criarTurmaService: CriarTurmaService) { 
        this.criarTurmaService.professor_responsavel().subscribe(
            (meu_user) => { 
                if(meu_user != null){
                    if(meu_user.hasOwnProperty('mascara')){
                        this.controla_notificacao(true, true, "Apenas professores podem fazer a criação de turmas!");
                    }
                    else{
                        this.professor = new Professor(meu_user["cpf"], meu_user["nome"], meu_user["email"], meu_user["senha"]);
                        this.controla_notificacao(false);
                    }
                }else{
                    this.controla_notificacao(true, true, "Voce nao esta logado no sistema!");
                }
                console.log(this.professor);
            },
        );
    }

    controla_notificacao(ativa: boolean, positiva: boolean = false, texto: String = ''){
        if (!ativa) {
            this.notificacaoClasses =  {
                esconder: true,
            };
        }else {
            this.notificacaoClasses =  {
                negativa: !positiva,
                positiva: positiva,
                esconder: false,
            };
            this.notificacaoTexto = texto;
        }
    }


    cadastrar_turma(nome: string, codigo:string, semestre:string){

        this.criarTurmaService.cadastro_turma(nome, codigo, semestre).subscribe(
            (status) => {
                if (status === "Turma cadastrada com sucesso!") {
        
                    this.controla_notificacao(true, true, status);
                } else if(status === 'Já existe uma turma cadastrada com esse código!') {
                    console.log(status);
                    this.controla_notificacao(true, false, status);
                } else if(status === 'Nome, codigo ou semestre nulos!'){
                    console.log(status)
                    this.controla_notificacao(true, false, status);
                } else if(status === 'Apenas professores podem realizar a criação de turmas!'){
                    console.log(status)
                    this.controla_notificacao(true, false, status);
                } else if(status === 'Você não está logado como professor no sistema!'){
                    console.log(status)
                    this.controla_notificacao(true, false, status);
                } else {
                    console.log("Erro ao realizar a criação de turma!");
                    this.controla_notificacao(true, false, status);
                }
            },
        );
    }
}