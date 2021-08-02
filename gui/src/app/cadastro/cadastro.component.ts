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

    cadastrarUsuario(cpf: string, nome: string, email: string, senha:string): void{
        this.cadastroService.cadastrar(cpf, nome, email, senha).subscribe(
            (status) => {
                if (status === "Usuario cadastrado com sucesso!") {
                    this.cadastroService.getUsuarios().subscribe(
                        all_users => { this.usuarios = all_users; 
                                    console.log("Usuario cadastrado com sucesso!");
                                    },
                    );
                } else if(status === 'O usuario já existe na base de dados!') {
                    console.log("O usuario já existe na base de dados!");
                } else {
                    console.log("Erro ao cadastrar o novo usuario!");
                }
            },
        );
        console.log("Novo usuario:");
        console.log("CPF: ", cpf);
        console.log("Nome: ", nome);
        console.log("Email: ", email);
        console.log("Senha: ", senha);
    }
}