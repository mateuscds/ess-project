import { Usuario } from './usuario';

export class Professor extends Usuario{

  constructor(cpf: string, nome: string, email: string, senha: string) {
    super(cpf, nome, email, senha);
  }
}