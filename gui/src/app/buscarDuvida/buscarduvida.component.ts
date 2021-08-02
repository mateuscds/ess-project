import { Component, OnInit } from '@angular/core';

// import { Buscarduvida } from '../../../../common/buscarduvida';
// import {  } from './aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './buscarduvida.component.html',
  styleUrls: ['./buscarduvida.component.css']
})

// LUGAR DE STRING PŔECISO DA CLASSE DA DÚVIDA!!!
export class Buscarduvida {
    todasDuvidas: String[] = []
    filtroDuvidas: String[] = ['duvida_1','duvida_2','duvidaaaaaaaaaaaa_3']

    // get Duvidas(): String[] {
    //     return this.filtroDuvidas
    // }

    // set allDuvidas(duvidas: String[]) {
    //     this.todasDuvidas = duvidas
    // }

    filtrarDuvidas(filtro: string): void {
        this.filtroDuvidas = this.todasDuvidas.filter(duvida => {
            return duvida.includes(filtro)
        })
    }
}