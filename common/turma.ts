import { Professor } from './professor';
import { Usuario } from './usuario';

export class Turma{

	private nome : string;
    private codigo : string;
	private semestre : string;
    private professor_responsavel : Professor;

    private lista_de_alunos: Array<[Usuario, string]>; 

    constructor(nome: string, codigo: string, semestre: string, professor_responsavel: Professor) {
		this.nome = nome;
		this.codigo = codigo;
		this.semestre = semestre;
		this.professor_responsavel = professor_responsavel;
        this.lista_de_alunos = [];
	}

    get Nome(): string{
		return this.nome;
	}

	set Nome(nome: string){
        this.nome = nome;
	}

    get Codigo(): string{
		return this.codigo;
	}

	set Codigo(codigo: string){
        this.codigo = codigo;
	}

    get Semestre(): string{
		return this.semestre;
	}

	set Semestre(semestre: string){
        this.semestre = semestre;
	}

    get Professor_responsavel(): Professor{
		return this.professor_responsavel;
	}

	set Professor_responsavel(professor_responsavel: Professor){
        this.professor_responsavel = professor_responsavel;
	}
}