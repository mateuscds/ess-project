"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(cpf, nome, email, senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
    get Nome() {
        return this.nome;
    }
    set Nome(nome) {
        this.nome = nome;
    }
    get Cpf() {
        return this.cpf;
    }
    set Cpf(cpf) {
        this.cpf = cpf;
    }
    get Email() {
        return this.email;
    }
    set Email(email) {
        this.email = email;
    }
    get Senha() {
        return this.senha;
    }
    set Senha(senha) {
        this.senha = senha;
    }
}
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.js.map