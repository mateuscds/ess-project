"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aluno_1 = require("../../common/aluno");
const professor_1 = require("../../common/professor");
const turma_1 = require("../../common/turma");
describe("A turma ", () => {
    it("adiciona um convite corretamente", () => {
        let turma_teste = new turma_1.Turma('ESS', 'IF678', '6º', new professor_1.Professor('111.222.333-44', 'Marcio', 'marcio@ufpe.br', '1234'));
        let aluno = new aluno_1.Aluno('199.299.399-19', 'Lucas', 'lucas@ufpe.br', 'lucas88');
        let status = "Pendente";
        turma_teste.Adicionar_convite(aluno, status);
        let retorno = turma_teste.Lista_de_alunos;
        let correto = false;
        for (let a of retorno) {
            let student = a[0], status_recebido = a[1];
            if (student.Cpf == aluno.Cpf && status_recebido == status) {
                correto = true;
            }
        }
        expect(correto).toEqual(true);
    });
});
//# sourceMappingURL=turma.spec.js.map