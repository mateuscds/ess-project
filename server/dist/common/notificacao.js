"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notificacao = void 0;
class Notificacao {
    constructor(mensagem, tipo, codigo) {
        this.mensagem = mensagem;
        this.tipo = tipo;
        this.codigo = codigo;
    }
    get Mensagem() {
        return this.mensagem;
    }
    set Mensagem(mensagem) {
        this.mensagem = mensagem;
    }
    get Tipo() {
        return this.tipo;
    }
    set Tipo(tipo) {
        this.tipo = tipo;
    }
    get Codigo() {
        return this.codigo;
    }
    set Codigo(codigo) {
        this.codigo = codigo;
    }
}
exports.Notificacao = Notificacao;
//# sourceMappingURL=notificacao.js.map