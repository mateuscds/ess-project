export class Notificacao{

	private mensagem : string;

	constructor(msg: string) {
		this.mensagem = msg;
	}

	get Mensagem(): string{
		return this.mensagem;
	}

	set Mensagem(msg: string){
        this.mensagem = msg;
	}



}