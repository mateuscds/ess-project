"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turma = void 0;
class Turma {
    constructor(nome, codigo, semestre, professor_responsavel) {
        this.nome = nome;
        this.codigo = codigo;
        this.semestre = semestre;
        this.professor_responsavel = professor_responsavel;
        this.lista_de_alunos = [];
    }
    get Nome() {
        return this.nome;
    }
    set Nome(nome) {
        this.nome = nome;
    }
    get Codigo() {
        return this.codigo;
    }
    set Codigo(codigo) {
        this.codigo = codigo;
    }
    get Semestre() {
        return this.semestre;
    }
    set Semestre(semestre) {
        this.semestre = semestre;
    }
    get Professor_responsavel() {
        return this.professor_responsavel;
    }
    set Professor_responsavel(professor_responsavel) {
        this.professor_responsavel = professor_responsavel;
    }
    get Lista_de_alunos() {
        return this.lista_de_alunos;
    }
    set Lista_de_alunos(lista_de_alunos) {
        this.lista_de_alunos = lista_de_alunos;
    }
    Adicionar_convite(user, status) {
        this.lista_de_alunos.push([user, status]);
    }
}
exports.Turma = Turma;
//# sourceMappingURL=turma.js.map