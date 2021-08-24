import { Notificacao } from './notificacao';

export class Notificador{

	notificacoes: Array<Notificacao>; 
    private cpf_user: string;

	constructor(cpf_user: string) {
        this.notificacoes = [];
        this.cpf_user = cpf_user;
	}

    get Cpf_user(): string{
		return this.cpf_user;
	}

	set Cpf_user(cpf_user: string){
        this.cpf_user = cpf_user;
	}

    get Notificacoes(): Array<Notificacao>{
		return this.notificacoes;
	}

	set Notificacoes(notificacoes: Array<Notificacao>){
		this.notificacoes = notificacoes;
	}

}