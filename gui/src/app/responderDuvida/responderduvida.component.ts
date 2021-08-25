import { Component, OnInit } from '@angular/core';
import { Duvida } from '../../../../common/duvida';
import { Thread } from '../../../../common/thread';
import { ResponderDuvidaService } from './responderduvida.service';

@Component({
    selector: 'responder-duvida',
    templateUrl: './responderduvida.component.html',
    styleUrls: ['./responderduvida.component.css']
  })

export class ResponderDuvidaComponent {
    threads: Thread[] = [];
    private todasDuvidas: Duvida[] = [];
    private todasThreads: Thread[] = [];
    notificacaoClasses: {} = {};
    notificacaoTexto: String = '';

    indice = -1;

    constructor(private ResponderDuvidaService: ResponderDuvidaService) { }

    ngOnInit() {
        this.ResponderDuvidaService.getTodasDuvidas().subscribe(
            duvidas => {this.todasDuvidas = duvidas}
        )
        this.ResponderDuvidaService.getTodasThreads().subscribe(
            threads => {this.todasThreads = threads}
        )
    }

    get ExibidasDuvidas() {
        console.log(this.todasDuvidas)
        return this.todasDuvidas
    }

    get ExibidasThreads() {
        console.log(this.todasThreads)
        return this.todasThreads
    }

    exibirTodasDuvidas(): void {
        this.ResponderDuvidaService.getTodasDuvidas().subscribe(
            duvidas => {this.todasDuvidas = duvidas}
        )
    }

    exibirTodasThreads(): void {
        this.ResponderDuvidaService.getTodasThreads().subscribe(
            threads => {this.todasThreads = threads}
        )
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

    responderDuvida(discursao: string, id: string): void{
    
        this.ResponderDuvidaService.responder(discursao, id).subscribe(
            (status) => {
                if (status === "Resposta cadastrada com sucesso!") {
                    this.ResponderDuvidaService.getTodasThreads().subscribe(
                        all_threads => { 
                        this.threads = all_threads; 
                        console.log(this.threads);
                        console.log(status);
                        },
                    );
                    this.controla_notificacao(true, true, status);
                }else if(status === 'Alguma das entradas esta nula!'){
                    this.controla_notificacao(true, false, status);
                } else {
                    console.log("Erro ao responder uma novo duvida!");
                    this.controla_notificacao(true, false, status);
                }
                console.log(status);
            },
        );
    }
}