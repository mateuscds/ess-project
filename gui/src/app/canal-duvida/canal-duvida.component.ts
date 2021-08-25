import { Component, OnInit } from '@angular/core';
import { CanalDuvidaService } from './canal-duvida.service';

@Component({
  selector: 'app-canal-duvida',
  templateUrl: './canal-duvida.component.html',
  styleUrls: ['./canal-duvida.component.css']
})
export class CanalDuvidaComponent {

  notificacaoClasses: {} = {};
  notificacaoTexto: String = '';

  constructor(private canalDuvidaService: CanalDuvidaService) { }

  cadastrar_duvida(topico: string, subtopico:string, descricao:string) {
    this.canalDuvidaService.cadastrar_canal_duvida(topico, subtopico, descricao).subscribe(
        (status) => {
            if (status === "Turma cadastrada com sucesso!") {
    
                this.controla_notificacao(true, true, status);
            } else if(status === 'Já existe uma turma cadastrada com esse código!') {
                console.log(status);
                this.controla_notificacao(true, false, status);
            } else if(status === 'Nome, codigo ou semestre nulos!'){
                console.log(status)
                this.controla_notificacao(true, false, status);
            } else if(status === 'Apenas professores podem realizar a criação de turmas!'){
                console.log(status)
                this.controla_notificacao(true, false, status);
            } else if(status === 'Você não está logado como professor no sistema!'){
                console.log(status)
                this.controla_notificacao(true, false, status);
            } else {
                console.log("Erro ao realizar a criação de turma!");
                this.controla_notificacao(true, false, status);
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
}
