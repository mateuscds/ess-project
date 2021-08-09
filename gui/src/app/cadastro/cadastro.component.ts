import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../common/usuario';
import { CadastroService } from './cadastro.service';

@Component({
    selector: 'cadastro-usuarios',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
  })

export class CadastroComponent {
    usuarios: Usuario[] = [];

    constructor(private cadastroService: CadastroService) { }

    cadastrarUsuario(cpf: string, nome: string, email: string, senha:string, prof_monitor:boolean, aluno:boolean): void{
    
        let eh_aluno = false;
        if(aluno){
            eh_aluno = true;
        }

        this.cadastroService.cadastrar(cpf, nome, email, senha, eh_aluno).subscribe(
            (status) => {
                if (status === "Usuario cadastrado com sucesso!") {
                    this.cadastroService.getUsuarios().subscribe(
                        all_users => { 
                        this.usuarios = all_users; 
                        console.log(this.usuarios);
                        console.log(status);
                        },
                    );
                } else if(status === 'Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!') {
                    console.log(status);
                } else if(status === 'Alguma das entradas esta nula!'){
                    console.log(status)
                } else {
                    console.log("Erro ao cadastrar o novo usuario!");
                }
            },
        );
    }
}