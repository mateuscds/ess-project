"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notificacao = void 0;
class Notificacao {
    constructor(mensagem, tipo) {
        this.mensagem = mensagem;
        this.tipo = tipo;
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
}
exports.Notificacao = Notificacao;
//# sourceMappingURL=notificacao.js.map