import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Duvida } from './../../../../common/duvida'

import { ExibirDuvidaService } from './exibirduvida.service';

@Component({
  selector: 'exibir-duvida',
  templateUrl: './exibirduvida.component.html',
  styleUrls: ['./exibirduvida.component.css']
})

export class ExibirDuvidaComponent implements OnInit{

    private todasDuvidas: Duvida[] = [];

    constructor(private exibirDuvidaService: ExibirDuvidaService) {}

    ngOnInit() {
        this.exibirDuvidaService.getTodasDuvidas().subscribe(
            duvidas => {this.todasDuvidas = duvidas}
        )
    }

    get ExibidasDuvidas() {
        console.log(this.todasDuvidas)
        return this.todasDuvidas
    }

    exibirTodasDuvidas(): void {
        this.exibirDuvidaService.getTodasDuvidas().subscribe(
            duvidas => {this.todasDuvidas = duvidas}
        )
    }
}