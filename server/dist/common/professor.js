"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professor = void 0;
const usuario_1 = require("./usuario");
class Professor extends usuario_1.Usuario {
    constructor(cpf, nome, email, senha) {
        super(cpf, nome, email, senha);
    }
}
exports.Professor = Professor;
//# sourceMappingURL=professor.js.map