export class Notificacao{

	private mensagem : string;
    private tipo: string;
    private cpf_user: string;

	constructor(msg: string, tipo: string, cpf_user: string) {
		this.mensagem = msg;
        this.tipo = tipo;
        this.cpf_user = cpf_user;
	}

	get Mensagem(): string{
		return this.mensagem;
	}

	set Mensagem(msg: string){
        this.mensagem = msg;
	}

    get Tipo(): string{
		return this.tipo;
	}

	set Tipo(tipo: string){
        this.tipo = tipo;
	}

    get Cpf_user(): string{
		return this.cpf_user;
	}

	set Cpf_user(cpf_user: string){
        this.cpf_user = cpf_user;
	}


}