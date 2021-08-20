"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notificador = void 0;
class Notificador {
    constructor(cpf_user) {
        let n = "Inicial";
        this.notificacoes = [];
        this.notificacoes.push(n);
        this.cpf_user = cpf_user;
    }
    get Cpf_user() {
        return this.cpf_user;
    }
    set Cpf_user(cpf_user) {
        this.cpf_user = cpf_user;
    }
    get Notificacoes() {
        return this.notificacoes;
    }
    set Notificacoes(notificacoes) {
        this.notificacoes = notificacoes;
    }
}
exports.Notificador = Notificador;
//# sourceMappingURL=notificador.js.map