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

    logado: boolean = false;

    cpf_user:string = "";

    constructor(private notificadorservice: NotificadorService) { 
        this.atualizarNotificacoes();
    }


    alguemLogado(): void{
        this.notificadorservice.logado().subscribe(
            (usuario) => {
                if (usuario != null) {
                    this.cpf_user = usuario.Cpf;
                    this.logado = true;
                    console.log("Tem gente logado");
                } else {
                    this.logado = false;
                }
            },
        );
    }


    atualizarNotificacoes(): void{
        this.alguemLogado();
        this.notificadorservice.atualizar().subscribe(
            (notificador) => {
                if (notificador != undefined) {  
                    this.notificador = notificador;
                } else {
                    console.log("Cara veio nulo")
                }
            },
        );

        console.log("Atualizou");
        console.log(this.notificador);
    }
    
}