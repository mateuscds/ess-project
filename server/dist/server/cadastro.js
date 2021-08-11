"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cadastro = void 0;
class Cadastro {
    constructor() {
        this.usuarios = [];
    }
    get Usuarios() {
        return this.usuarios;
    }
    cadastrar(usuario) {
        if (this.existe(usuario)) {
            return false;
        }
        else {
            this.usuarios.push(usuario);
            return true;
        }
    }
    existe(u) {
        for (let i of this.usuarios) {
            if (i.Cpf == u.Cpf || i.Email == u.Email) {
                return true;
            }
        }
        return false;
    }
}
exports.Cadastro = Cadastro;
//# sourceMappingURL=cadastro.js.map