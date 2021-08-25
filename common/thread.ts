export class Thread{

	discursao : string;
    id: number;

	constructor(discursao: string, id: number) {
		this.discursao = discursao;
        this.id = id;
	}

	get Discursao(): string{
		return this.discursao;
	}

	set Discursao(discursao: string){
        this.discursao = discursao;
	}

    get Id(): number{
		return this.id;
	}

	set Id(id: number){
        this.id = id;
	}

}