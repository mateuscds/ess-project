import { Component, OnInit } from '@angular/core';
import { Duvida } from '../../../../common/duvida';
import { PublicarDuvidaService } from './publicarduvida.service';

@Component({
    selector: 'publicar-duvida',
    templateUrl: './publicarduvida.component.html',
    styleUrls: ['./publicarduvida.component.css']
  })

export class PublicarDuvidaComponent {
    duvidas: Duvida[] = [];
    notificacaoClasses: {} = {};
    notificacaoTexto: String = '';

    constructor(private PublicarDuvidaService: PublicarDuvidaService) { }

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

    cadastrarDuvida(titulo: string, status: boolean, assunto: string, descricao: string): void{
    
        this.PublicarDuvidaService.cadastrar(titulo, status, assunto, descricao).subscribe(
            (status) => {
                if (status === "Usuario cadastrado com sucesso!") {
                    this.PublicarDuvidaService.getTodasDuvidas().subscribe(
                        all_doubt => { 
                        this.duvidas = all_doubt; 
                        console.log(this.duvidas);
                        console.log(status);
                        },
                    );
                    this.controla_notificacao(true, true, status);
                } else if(status === 'Uma duvida com esse TITULO ja existe na base de dados!') {
                    console.log(status);
                    this.controla_notificacao(true, false, status);
                } else if(status === 'Alguma das entradas esta nula!'){
                    console.log(status)
                    this.controla_notificacao(true, false, status);
                } else {
                    console.log("Erro ao cadastrar a novo duvida!");
                    this.controla_notificacao(true, false, status);
                }
            },
        );
    }
}