import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../common/usuario';
import { Turma } from '../../../../common/turma';
import { Professor } from '../../../../common/professor';
import { Aluno } from '../../../../common/aluno';
import { MinhasTurmasService } from './minhas_turmas.service';
import { Router } from '@angular/router';

function ehAluno(objeto: Usuario) { 
    if(objeto.hasOwnProperty('mascara')){
        return true;
    }
    else{
        return false;
    }
}

@Component({
    selector: 'minhas_turmas',
    templateUrl: './minhas_turmas.component.html',
    styleUrls: ['./minhas_turmas.component.css']
  })

  
export class MinhasTurmasComponent {

    notificacaoClasses: {} = {};
    notificacaoTexto: String = '';
    
    turmas: Turma[] = [];
    meu_usuario = new Usuario('', '', '', '');
    typeUser = false; // false indica professor
    lista_status: String[] = [];

    constructor(private minhasTurmasService: MinhasTurmasService) { 
        this.minhasTurmasService.retorna_minhas_turmas().subscribe(
            (infos) => { 

                let minhas_turmas = infos[0];
                this.lista_status = infos[1];

                if(minhas_turmas != null){

                    this.turmas = [];
                    
                    for (let t of minhas_turmas){
                        let turma = new Turma('', '', '', new Professor('', '', '', ''));
                        Object.assign(turma, t);

                        this.turmas.push(turma);
                    }
                }
            },
        );

        this.minhasTurmasService.meu_usuario().subscribe(
            (meu_user) => { 
                if(meu_user != null){
                    if(ehAluno(meu_user)){
                        this.meu_usuario = new Aluno(meu_user["cpf"], meu_user["nome"], meu_user["email"], meu_user["senha"]);
                        this.controla_notificacao(true, true, "");

                        this.typeUser = true;
                    }
                    else{
                        this.meu_usuario = new Professor(meu_user["cpf"], meu_user["nome"], meu_user["email"], meu_user["senha"]);
                        this.controla_notificacao(true, true, "");

                        this.typeUser = false;
                    }
                }else{
                    this.controla_notificacao(true, true, "Voce nao esta logado no sistema!");
                }
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

    envia_turma(codigo: string){

        console.log(codigo);

        this.minhasTurmasService.envia_turma(codigo).subscribe(
            
            (status) => {
                
                console.log(status);
            }
        );
    }

    aceita_convite(codigo: string){

        this.minhasTurmasService.atualiza_convite(codigo, true).subscribe(
            (status) => {
                if (status === "Convite aceito com sucesso!") {
                    this.controla_notificacao(true, true, status);
                } else if(status === 'Usuário não encontrado!') {
                    console.log(status);
                    this.controla_notificacao(true, false, status);
                } else {
                    console.log("Erro ao realizar a atualizacao!");
                    this.controla_notificacao(true, false, status);
                }
            },
        );

        this.minhasTurmasService.retorna_minhas_turmas().subscribe(
            (infos) => { 

                let minhas_turmas = infos[0];
                this.lista_status = infos[1];

                if(minhas_turmas != null){

                    this.turmas = [];
                    
                    for (let t of minhas_turmas){
                        let turma = new Turma('', '', '', new Professor('', '', '', ''));
                        Object.assign(turma, t);

                        this.turmas.push(turma);
                    }
                }
            },
        );
    }

    rejeita_convite(codigo: string){

        this.minhasTurmasService.atualiza_convite(codigo, false).subscribe(
            (status) => {
                if (status === "Convite rejeitado com sucesso!") {
                    this.controla_notificacao(true, true, status);
                } else if(status === 'Usuário não encontrado!') {
                    console.log(status);
                    this.controla_notificacao(true, false, status);
                } else {
                    console.log("Erro ao realizar a atualizacao!");
                    this.controla_notificacao(true, false, status);
                }
            },
        );

        this.minhasTurmasService.retorna_minhas_turmas().subscribe(
            (infos) => { 

                let minhas_turmas = infos[0];
                this.lista_status = infos[1];

                if(minhas_turmas != null){

                    this.turmas = [];
                    
                    for (let t of minhas_turmas){
                        let turma = new Turma('', '', '', new Professor('', '', '', ''));
                        Object.assign(turma, t);

                        this.turmas.push(turma);
                    }
                }
            },
        );
    }
}