"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluno = void 0;
const usuario_1 = require("./usuario");
function calculaMascara(cpf) {
    var parte1 = cpf.substring(0, 3);
    var parte2 = cpf.substring(3, 6);
    var parte3 = cpf.substring(6, 9);
    var parte4 = cpf.substring(9, 11);
    var parte1_numero = 4 * Number(parte1);
    var parte2_numero = 3 * Number(parte2);
    var parte3_numero = 2 * Number(parte3);
    var parte4_numero = Number(parte4);
    var mascara = "" + parte1_numero + '_' + parte2_numero + '_' + parte3_numero + '_' + parte4_numero;
    return mascara;
}
class Aluno extends usuario_1.Usuario {
    constructor(cpf, nome, email, senha) {
        super(cpf, nome, email, senha);
        this.mascara = calculaMascara(this.Cpf);
    }
    get Mascara() {
        return this.mascara;
    }
}
exports.Aluno = Aluno;
//# sourceMappingURL=aluno.js.map