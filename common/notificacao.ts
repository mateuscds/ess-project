export class Notificacao{

	mensagem: string;
    tipo: string;

	constructor(mensagem: string, tipo: string) {
        this.mensagem = mensagem;
        this.tipo = tipo;
	}

    get Mensagem(): string{
		return this.mensagem;
	}

	set Mensagem(mensagem: string){
        this.mensagem = mensagem;
	}

    get Tipo(): string{
		return this.tipo;
	}

	set Tipo(tipo: string){
        this.tipo = tipo;
	}

}