import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../common/usuario';
import { Aluno } from '../../../../common/aluno';
import { Professor } from '../../../../common/professor';
import { Turma } from '../../../../common/turma';

import { GerenciamentoTurmaService } from './gerenciamento_turma.service';


@Component({
    selector: 'gerencimento_turma',
    templateUrl: './gerenciamento_turma.component.html',
    styleUrls: ['./gerenciamento_turma.component.css']
})

export class GerenciamentoTurmaComponent {
    notificacaoClasses: {} = {};
    notificacaoTexto: String = '';
    notificacao_login: String = '';
    turma = new Turma('', '', '', new Professor('', '', '', ''));
    meu_usuario = null;
    
    constructor(private gerenciamentoTurmaService: GerenciamentoTurmaService) { 
        this.gerenciamentoTurmaService.minha_turma().subscribe(
            (minha_turma) => { 
                if(minha_turma != null){

                    Object.assign(this.turma, minha_turma);
                    this.controla_notificacao(false);
                    
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

    atualiza(nome: string, codigo: string, semestre: string){
        this.gerenciamentoTurmaService.atualiza(nome, codigo, semestre).subscribe(
            (status) => {
                if (status === "Atualizacao realizada com sucesso!") {
                    this.controla_notificacao(true, true, status);
                } else if(status === 'Uma outra turma com esse código ja existe na base de dados!') {
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
        this.gerenciamentoTurmaService.minha_turma().subscribe(
            (minha_turma) => { 
                if(minha_turma != null){

                    Object.assign(this.turma, minha_turma);
                }
            },
        );
    }

    deleta(){
        
        this.gerenciamentoTurmaService.deleta().subscribe(
            (status) => {
                if (status === "Turma deletada do sistema com sucesso!") {

                    this.controla_notificacao(true, true, status);
                    this.turma = new Turma('', '', '', new Professor('', '', '', ''));
                }else{
                    this.controla_notificacao(true, false, "Erro ao realizar o delete!");
                }
                console.log(this.turma);
            }
        );
    }

    convidar(email: string){
        
        this.gerenciamentoTurmaService.convidar(email).subscribe(
            (status) => {
                if (status === "Usuario convidado com sucesso!") {

                    this.controla_notificacao(true, true, status);
                } else if(status === 'O email do convite não pode ser vazio!'){
                    console.log(status)
                    this.controla_notificacao(true, false, status);
                } else if(status === 'O usuario convidado não existe no sistema!'){
                    console.log(status)
                    this.controla_notificacao(true, false, status);
                } else if(status === 'O usuario já foi convidado!'){
                    console.log(status)
                    this.controla_notificacao(true, false, status);
                }else{
                    this.controla_notificacao(true, false, "Erro ao realizar o convite!");
                }
            }
        );

        this.gerenciamentoTurmaService.minha_turma().subscribe(
            (minha_turma) => { 
                if(minha_turma != null){

                    console.log("Minha turma: ", minha_turma);

                    Object.assign(this.turma, minha_turma);

                    console.log(this.turma);
                    console.log(this.turma.Lista_de_alunos);
                }
            },
        );
    }
}