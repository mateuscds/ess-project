export class Usuario{

	private nome : string;
    private cpf : string;
	private email : string;
    private senha : string;

	constructor(cpf: string, nome: string, email: string, senha: string) {
		this.nome = nome;
		this.cpf = cpf;
		this.email = email;
		this.senha = senha;
	}

	get Nome(): string{
		return this.nome;
	}

	set Nome(nome: string){
        this.nome = nome;
	}

    get Cpf(): string{
		return this.cpf;
	}

	set Cpf(cpf: string){
        this.cpf = cpf;
	}

    get Email(): string{
		return this.email;
	}

	set Email(email: string){
        this.email = email;
	}

    get Senha(): string{
		return this.senha;
	}

	set Senha(senha: string){
        this.senha = senha;
	}

}