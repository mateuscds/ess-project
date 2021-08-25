"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duvida = void 0;
class Duvida {
    constructor(titulo, status, assunto, descricao, codigo) {
        this.titulo = titulo;
        this.assunto = assunto;
        this.status = status;
        this.descricao = descricao;
        this.codigo = codigo;
    }
    get Titulo() {
        return this.titulo;
    }
    set Titulo(titulo) {
        this.titulo = titulo;
    }
    get Status() {
        return this.status;
    }
    set Status(status) {
        this.status = status;
    }
    get Assunto() {
        return this.assunto;
    }
    set Assunto(assunto) {
        this.assunto = assunto;
    }
    get Descricao() {
        return this.descricao;
    }
    set Descricao(descricao) {
        this.descricao = descricao;
    }
    get Codigo() {
        return this.codigo;
    }
    set Codigo(codigo) {
        this.codigo = codigo;
    }
}
exports.Duvida = Duvida;
//# sourceMappingURL=duvida.js.map