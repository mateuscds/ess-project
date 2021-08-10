import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../common/usuario';
import { Aluno } from '../../../../common/aluno';
import { Professor } from '../../../../common/professor';

import { MinhaContaService } from './minha_conta.service';


@Component({
    selector: 'minha_conta',
    templateUrl: './minha_conta.component.html',
    styleUrls: ['./minha_conta.component.css']
  })

  export class MinhaContaComponent {
    notificacaoClasses: {} = {};
    notificacaoTexto: String = '';
    meu_usuario = new Usuario('', '', '', '');

    constructor(private minhaContaService: MinhaContaService) { 
        this.minhaContaService.meu_usuario().subscribe(
            (meu_user) => { 
                if(meu_user.hasOwnProperty('mascara')){
                    this.meu_usuario = new Aluno(meu_user["cpf"], meu_user["nome"], meu_user["email"], meu_user["senha"]);
                }
                else{
                    this.meu_usuario = new Professor(meu_user["cpf"], meu_user["nome"], meu_user["email"], meu_user["senha"]);
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

    atualiza(cpf: string, nome: string, email: string, senha: string){
        this.minhaContaService.atualiza(cpf, nome, email, senha).subscribe(
            (status) => {
                if (status === "Atualizacao realizada com sucesso!") {
                    this.controla_notificacao(true, true, status);
                } else if(status === 'Um outro usuario com esse CPF ou esse EMAIL ja existe na base de dados!') {
                    console.log(status);
                    this.controla_notificacao(true, false, status);
                } else if(status === 'Alguma das entradas esta nula!'){
                    console.log(status)
                    this.controla_notificacao(true, false, status);
                } else {
                    console.log("Erro ao realizar a atualizacao!");
                    this.controla_notificacao(true, false, status);
                }
            },
        );
        this.minhaContaService.meu_usuario().subscribe(
            (meu_user) => { 
                if(meu_user.hasOwnProperty('mascara')){
                    this.meu_usuario = new Aluno(meu_user["cpf"], meu_user["nome"], meu_user["email"], meu_user["senha"]);
                }
                else{
                    this.meu_usuario = new Professor(meu_user["cpf"], meu_user["nome"], meu_user["email"], meu_user["senha"]);
                }
            },
        );
        console.log(this.meu_usuario);
    }
}