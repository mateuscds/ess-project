import { Notificacao } from './notificacao';

export class Notificador{

	private notificacoes: Array<Notificacao>; 
    private cpf_user: string;

	constructor(cpf_user: string) {
		let n = new Notificacao("Inicial");
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

    get Notificacoes(): Array<Notificacao>{
		return this.notificacoes;
	}

	set Notificacoes(notificacoes: Array<Notificacao>){
		this.notificacoes = notificacoes;
	}

}