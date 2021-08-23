export class Duvida{

	titulo : string;
    status : boolean;
    assunto: string
	descricao : string;

	constructor(titulo: string, status: boolean, assunto: string, descricao: string) {
		this.titulo = titulo;
        this.assunto = assunto;
		this.status = status;
		this.descricao = descricao;
	}

	get Titulo(): string{
		return this.titulo;
	}

	set Titulo(titulo: string){
        this.titulo = titulo;
	}

    get Status(): boolean{
		return this.status;
	}

	set Status(status: boolean){
        this.status = status;
	}

    get Assunto(): string{
		return this.assunto;
	}

	set Assunto(assunto: string){
        this.assunto = assunto;
	}

    get Descricao(): string{
		return this.descricao;
	}

	set Descricao(descricao: string){
        this.descricao = descricao;
	}

}