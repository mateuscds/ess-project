import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../common/usuario';
import { Turma } from '../../../../common/turma';
import { Professor } from '../../../../common/professor';
import { MinhasTurmasService } from './minhas_turmas.service';
import { Router } from '@angular/router';

@Component({
    selector: 'minhas_turmas',
    templateUrl: './minhas_turmas.component.html',
    styleUrls: ['./minhas_turmas.component.css']
  })

  
export class MinhasTurmasComponent {

    notificacaoClasses: {} = {};
    notificacaoTexto: String = '';
    
    turmas: Turma[] = [];

    constructor(private minhasTurmasService: MinhasTurmasService) { 
        this.minhasTurmasService.retorna_minhas_turmas().subscribe(
            (minhas_turmas) => { 
                if(minhas_turmas != null){
                    //this.turmas = <Turma[]>minhas_turmas;

                    this.turmas = [];
                    
                    for (let t of minhas_turmas){
                        let turma = new Turma('', '', '', new Professor('', '', '', ''));
                        Object.assign(turma, t);

                        this.turmas.push(turma);
                    }
                }
                console.log(this.turmas);
                console.log(typeof this.turmas);
            },
        );
    }
}