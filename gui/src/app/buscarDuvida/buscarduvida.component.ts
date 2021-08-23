import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Duvida } from './../../../../common/duvida'

// import { Buscarduvida } from '../../../../common/buscarduvida';
import { BuscarDuvidaService } from './buscarduvida.service';

@Component({
  selector: 'buscar-duvida',
  templateUrl: './buscarduvida.component.html',
  styleUrls: ['./buscarduvida.component.css']
})

export class Buscarduvida implements OnInit{

    private todasDuvidas: Duvida[] = [];
    private filtradasDuvidas: Duvida[] = [];

    typeSearch: string = "titulo";

    constructor(private buscarDuvidaService: BuscarDuvidaService) {}

    ngOnInit() {
        this.buscarDuvidaService.getTodasDuvidas().subscribe(
            duvidas => {this.filtradasDuvidas = duvidas
            this.todasDuvidas = duvidas}
        )
    }

    get FiltradasDuvidas() {
        return this.filtradasDuvidas
    }
    
    filtrarDuvidas(filtro: string, ambasConcl:boolean, concluida: boolean, naoConcluida: boolean): void{
        this.buscarTodasDuvidas()

        // console.log(this.todasDuvidas)
        let duvidas = this.todasDuvidas

        if(this.typeSearch === 'titulo') {
            if (filtro != "") 
                duvidas = this.filtrarDuvidasPeloTitulo(duvidas, filtro)
        }
        else if(this.typeSearch === 'assunto') {
            if (filtro != "") 
                duvidas = this.filtrarDuvidasPorAssunto(duvidas, filtro)
        }
        
        if (!ambasConcl) {
            if (concluida) {
                duvidas = this.filtrarDuvidasConcluidas(duvidas)
            }
            else {
                duvidas = this.filtrarDuvidasNaoConcluidas(duvidas)
            }
        }

        this.filtradasDuvidas = duvidas
    }

    filtrarDuvidasPeloTitulo(duvidas: Duvida[], filtro: string): Duvida[] {
        duvidas = duvidas.filter(duvida => {
            return duvida.titulo.toUpperCase().includes(filtro.toUpperCase())
        })
        return duvidas
    }
    
    filtrarDuvidasPorAssunto(duvidas: Duvida[], filtro: string): Duvida[] {
        return duvidas.filter(duvida => {
            return duvida.assunto.toUpperCase() === filtro.toUpperCase()
        })
    }

    filtrarDuvidasConcluidas(duvidas: Duvida[]): Duvida[] {
        duvidas = duvidas.filter(duvida => {
            return duvida.status
        })
        return duvidas
    }

    filtrarDuvidasNaoConcluidas(duvidas: Duvida[]): Duvida[] {
        duvidas = duvidas.filter(duvida => {
            return !duvida.status
        })
        return duvidas
    }

    buscarTodasDuvidas(): void {
        // Solicitação no servidor aqui!!
        // let duvida1 = new Duvida("duvida1", true, "Requisitos", "Como que faço isso?")
        // let duvida2 = new Duvida("duvida2", true, "Teste", "Como que faço isso?")
        // let duvida3 = new Duvida("duvida3", false, "Requisitos", "Como que faço aquilo lá?")

        // let duvidas = [duvida1, duvida2, duvida3]
        // this.todasDuvidas = duvidas
        // console.log(duvidas)
        // --------------------
        // th is.todasDuvidas = []
        this.buscarDuvidaService.getTodasDuvidas().subscribe(
            duvidas => {this.todasDuvidas = duvidas}
        )
    }
}