import { Notificacao } from './notificacao';

export class Notificador{

	notificacoes: Array<string>; 
    private cpf_user: string;

	constructor(cpf_user: string) {
		let n = "Inicial";
        this.notificacoes = [];
		this.notificacoes.push(n);
        this.cpf_user = cpf_user;
	}

    get Cpf_user(): string{
		return this.cpf_user;
	}

	set Cpf_user(cpf_user: string){
        this.cpf_user = cpf_user;
	}

    get Notificacoes(): Array<string>{
		return this.notificacoes;
	}

	set Notificacoes(notificacoes: Array<string>){
		this.notificacoes = notificacoes;
	}

}