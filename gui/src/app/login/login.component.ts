import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../common/usuario';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

export class LoginComponent {
    notificacaoClasses: {} = {};
    notificacaoTexto: String = '';

    constructor(private loginService: LoginService, private router: Router) { }

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

    fazerLogin(email: string, senha:string){
        this.loginService.login(email, senha).subscribe(
            (status) => {
                if (status === "Login realizado com sucesso!") {
                    this.router.navigateByUrl('/minha_conta');
                    //this.controla_notificacao(true, true, status);
                } else if(status === 'E-mail ou senha incorretos!') {
                    console.log(status);
                    this.controla_notificacao(true, false, status);
                } else if(status === 'E-mail ou senha nulos!'){
                    console.log(status)
                    this.controla_notificacao(true, false, status);
                } else {
                    console.log("Erro ao realizar o login!");
                    this.controla_notificacao(true, false, status);
                }
            },
        );
    }
}