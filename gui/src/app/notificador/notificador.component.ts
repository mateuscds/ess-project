import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../common/usuario';
import { Turma } from '../../../../common/turma';
import { Notificador } from '../../../../common/notificador';
import { Notificacao } from '../../../../common/notificacao';
import { NotificadorService } from './notificador.service';

@Component({
    selector: 'notificador',
    templateUrl: './notificador.component.html',
    styleUrls: ['./notificador.component.css']
  })

export class NotificadorComponent {
    usuarios: Usuario[] = [];
    turmas: Turma[] = [];

    notificador:Notificador = new Notificador("");

    alguem_logado: boolean = false;

    cpf_user:string = "";

    constructor(private notificadorservice: NotificadorService) { 
        for (let i = 0; i < 5; i++) {  
            this.notificadorservice.atualizar().subscribe(
                (notificador) => {
                    if (notificador != undefined) {  
                        this.notificador = notificador;
                    } else {
                        console.log("Cara veio nulo")
                    }
                },
            );
        }
    }


    alguemLogado(): void{
        for (let i = 0; i < 5; i++) {
            this.notificadorservice.logado().subscribe(
                (usuario) => {
                    if (usuario != null) {
                        this.cpf_user = usuario.Cpf;
                        this.alguem_logado = true;
                    } else {
                        this.alguem_logado = false;
                        this.notificador = new Notificador("");
                    }
                },
            );
        }
    }


    atualizarNotificacoes(): void{
        this.alguemLogado();
        for (let i = 0; i < 5; i++) {  
            this.notificadorservice.atualizar().subscribe(
                (notificador) => {
                    if (notificador != undefined) {  
                        this.notificador = notificador;
                    } else {
                        console.log("Cara veio nulo")
                    }
                },
            );
        }
        

        console.log(this.notificador);
        console.log("mensagens: ");
        console.log(this.notificador.notificacoes);

    }
    
}