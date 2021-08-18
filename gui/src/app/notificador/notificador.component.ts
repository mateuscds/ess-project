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

    notificador: Notificador = new Notificador("");

    constructor(private notificadorservice: NotificadorService) { }

    atualizarNotificacoes(): void{
    
        this.notificadorservice.atualizar().subscribe(
            (notificador) => {
                this.notificador = notificador;
            },
        );
    }

    limparNotificacoes(): void{
    
        this.notificadorservice.limpar(this.notificador.Cpf_user).subscribe(
            (msg) => {
                this.notificador = new Notificador(this.notificador.Cpf_user);
            },
        );
    }
}