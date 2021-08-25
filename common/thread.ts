export class Thread{

	discursao : string;
    id: string;

	constructor(discursao: string, id: string) {
		this.discursao = discursao;
        this.id = id;
	}

	get Discursao(): string{
		return this.discursao;
	}

	set Discursao(discursao: string){
        this.discursao = discursao;
	}

    get Id(): string{
		return this.id;
	}

	set Id(id: string){
        this.id = id;
	}

}