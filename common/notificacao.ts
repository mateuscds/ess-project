export class Notificacao{

	mensagem: string;
    tipo: string;
	codigo: string;

	constructor(mensagem: string, tipo: string, codigo:string) {
        this.mensagem = mensagem;
        this.tipo = tipo;
		this.codigo = codigo;
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

	get Codigo(): string{
		return this.codigo;
	}

	set Codigo(codigo: string){
        this.codigo = codigo;
	}

}