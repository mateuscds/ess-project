import { Usuario } from '../common/usuario';

export class Cadastro {
    private usuarios: Usuario[] = [];

    get Usuarios():Usuario[] {
        return this.usuarios;
    }

    cadastrar(usuario: Usuario):boolean {
        if (this.existe(usuario)){
            return false;
        } else {
            this.usuarios.push(usuario);
            return true;
        }
    }

    private existe(u: Usuario): boolean {
        for (let i of this.usuarios){
            if(i.Cpf == u.Cpf || i.Email == u.Email){
                return true;
            }
        }
        return false;
    }
}