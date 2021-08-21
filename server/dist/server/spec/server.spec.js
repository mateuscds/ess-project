"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
const fs = require('fs');
let path = require('path');
const professor_1 = require("../../common/professor");
const aluno_1 = require("../../common/aluno");
const turma_1 = require("../../common/turma");
var base_url = "http://localhost:3000/";
describe("O servidor", () => {
    var server;
    beforeAll(() => { server = require('../server'); });
    afterAll(() => { server.closeServer(); });
    /*it("inicialmente retorna uma lista de usuários vazia", () => {
        return request.get(base_url + "usuario").then(body => expect(body).toBe("[]")).catch(e => expect(e).toEqual(null));
    })

    it("não remove usuário sem estar logado", () => {
        return request.get(base_url + "usuario")
                .then(body =>{
                    let res = body;
                    return request.post(base_url + "deleta")
                        .then(body => {
                            body = JSON.parse(body);
                            expect(body).toEqual({"failure":"Nenhum usuario foi deletado do sistema!"});
                            return request.get(base_url + "usuario").then(body => {
                                expect(body).toEqual(res);
                            }).catch(e =>
                                expect(e).toEqual(null)
                            );
                        }).catch(e =>
                            expect(e).toEqual(null)
                        );
                }).catch(e =>
                  expect(e).toEqual(null)
                );
      })

    it("cadastro bem sucedido de aluno", () => {
        let aluno_test = new Aluno('111.222.333-44', 'João', 'joao@ufpe.br', '1234');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': aluno_test});
        return request.get(base_url + "usuario").then(body => {
            body = JSON.parse(body);
            let existe = false;
            for (let a of body){
                let aluno_auxiliar = new Aluno('', '', '', '');
                Object.assign(aluno_auxiliar, a);
                if(aluno_auxiliar.Cpf == aluno_test.Cpf && aluno_auxiliar.hasOwnProperty('mascara')){
                    existe = true;
                    break;
                }
            }
            expect(existe).toEqual(true);
        }).catch(e =>
            expect(e).toEqual(null)
        );
    })

    it("cadastro bem sucedido de professor", () => {
        let professor_test = new Professor('155.266.377-44', 'Júlia', 'julia@ufpe.br', '1615');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': professor_test});
        return request.get(base_url + "usuario").then(body => {
            body = JSON.parse(body);
            let existe = false;
            for (let a of body){
                let professor_auxiliar = new Professor('', '', '', '');
                Object.assign(professor_auxiliar, a);
                if(professor_auxiliar.Cpf == professor_test.Cpf && !(professor_auxiliar.hasOwnProperty('mascara'))){
                    existe = true;
                    break;
                }
            }
            expect(existe).toEqual(true);
        }).catch(e =>
            expect(e).toEqual(null)
        );
    })

    it("cadastro mal sucedido com CPF já cadastrado", () => {
        let usuario_test = new Professor('999.888.777-66', 'Maria', 'maria@ufpe.br', '1111');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': usuario_test});
        return request.get(base_url + "usuario").then(body => {
            let res = body;
            let novo_usuario_test = new Professor('999.888.777-66', 'Gabriel', 'gabriel@ufpe.br', '9876');
            return request.post({'url': base_url + 'usuarios/cadastrar', 'form': novo_usuario_test}).then(body => {
                body = JSON.parse(body);
                expect(body).toEqual({"failure":"Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!"});
                return request.get(base_url + "usuario").then(body => {
                    expect(body).toEqual(res);
                }).catch(e =>
                    expect(e).toEqual(null)
                );
            }).catch(e =>
                expect(e).toEqual(null)
            );
        }).catch(e =>
            expect(e).toEqual(null)
        );
    })

    it("cadastro mal sucedido com EMAIL já cadastrado", () => {
        let usuario_test = new Aluno('936.327.123-21', 'Rafaela', 'rafael@ufpe.br', '2222');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': usuario_test});
        return request.get(base_url + "usuario").then(body => {
            let res = body;
            let novo_usuario_test = new Aluno('555.777.888-99', 'Rafael', 'rafael@ufpe.br', '1212');
            return request.post({'url': base_url + 'usuarios/cadastrar', 'form': novo_usuario_test}).then(body => {
                body = JSON.parse(body);
                expect(body).toEqual({"failure":"Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!"});
                return request.get(base_url + "usuario").then(body => {
                    //console.log('RES:', res);
                    //console.log('BODY:', body);
                    expect(body).toEqual(res);
                }).catch(e =>
                    expect(e).toEqual(null)
                );
            }).catch(e =>
                expect(e).toEqual(null)
            );
        }).catch(e =>
            expect(e).toEqual(null)
        );
    })

    it("cadastro mal sucedido por falta de CPF", () => {
        let usuario_test = new Aluno('', 'Maria', 'maria@ufpe.br', '4545');
        return request.get(base_url + "usuario").then(body => {
            let res = body;
            return request.post({'url': base_url + 'usuarios/cadastrar', 'form': usuario_test}).then(body => {
                body = JSON.parse(body);
                expect(body).toEqual({"failure":"Alguma das entradas esta nula!"});
                return request.get(base_url + "usuario").then(body => {
                    expect(body).toEqual(res);
                }).catch(e =>
                    expect(e).toEqual(null)
                );
            }).catch(e =>
                expect(e).toEqual(null)
            );
        }).catch(e =>
            expect(e).toEqual(null)
        );
    })*/
    it("Cadastro das informações de uma nova turma - bem sucecido", () => {
        let professor_test = new professor_1.Professor('155.266.377-44', 'Júlia', 'julia@ufpe.br', '1615');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': professor_test });
        let infos = { "email": 'julia@ufpe.br', "senha": '1615' };
        request.post({ 'url': base_url + 'login', 'form': infos });
        let turma_a_cadastrar = { 'nome': 'ESS', 'codigo': 'IF689', 'semestre': '6º' };
        request.post({ 'url': base_url + 'criar_turma', 'form': turma_a_cadastrar });
        return request.get(base_url + "minhas_turmas").then(body => {
            body = JSON.parse(body);
            body = body[0];
            let existe = false;
            for (let a of body) {
                let turma_auxiliar = new turma_1.Turma('', '', '', new professor_1.Professor('', '', '', ''));
                Object.assign(turma_auxiliar, a);
                if (turma_auxiliar.Codigo == turma_a_cadastrar["codigo"]) {
                    existe = true;
                    break;
                }
            }
            expect(existe).toEqual(true);
        }).catch(e => expect(e).toEqual(null));
    });
    it("Cadastro das informações de uma nova turma - mal sucecido", () => {
        let professor_test = new professor_1.Professor('222.444.555-66', 'Bianca', 'bianca@ufpe.br', '3456');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': professor_test });
        let infos = { "email": 'bianca@ufpe.br', "senha": '3456' };
        request.post({ 'url': base_url + 'login', 'form': infos });
        let turma_teste = { 'nome': 'Ingles para Computação', 'codigo': 'IF689', 'semestre': '6º' };
        request.post({ 'url': base_url + 'criar_turma', 'form': turma_teste });
        let turma_a_cadastrar = { 'nome': 'Compiladores', 'codigo': 'IF689', 'semestre': '7º' };
        return request.get(base_url + "minhas_turmas").then(body => {
            let turmas_antiga = body;
            return request.post({ 'url': base_url + 'criar_turma', 'form': turma_a_cadastrar }).then(body => {
                body = JSON.parse(body);
                expect(body).toEqual({ "failure": "Já existe uma turma cadastrada com esse código!" });
                return request.get(base_url + "minhas_turmas").then(body => {
                    expect(body).toEqual(turmas_antiga);
                }).catch(e => expect(e).toEqual(null));
            }).catch(e => expect(e).toEqual(null));
        }).catch(e => expect(e).toEqual(null));
    });
    it("Cadastro das novas informações de uma turma - 3", () => {
        let professor_test = new professor_1.Professor('111.444.555-66', 'Mateus', 'mateus@ufpe.br', '5555');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': professor_test });
        let infos = { "email": 'mateus@ufpe.br', "senha": '5555' };
        request.post({ 'url': base_url + 'login', 'form': infos });
        let turma_teste1 = { 'nome': 'Calculo 1', 'codigo': 'IF887', 'semestre': '1º' };
        request.post({ 'url': base_url + 'criar_turma', 'form': turma_teste1 });
        let turma_teste2 = { 'nome': 'Logica', 'codigo': 'IF789', 'semestre': '2º' };
        request.post({ 'url': base_url + 'criar_turma', 'form': turma_teste2 });
        return request.get(base_url + "minhas_turmas").then(body => {
            body = JSON.parse(body);
            body = body[0];
            let turmas = body;
            let existe_turma1 = false, existe_turma2 = false;
            for (let a of turmas) {
                let turma_auxiliar = new turma_1.Turma('', '', '', new professor_1.Professor('', '', '', ''));
                Object.assign(turma_auxiliar, a);
                if (turma_auxiliar.Codigo == turma_teste1["codigo"]) {
                    existe_turma1 = true;
                }
                if (turma_auxiliar.Codigo == turma_teste2["codigo"]) {
                    existe_turma2 = true;
                }
            }
            expect(existe_turma1 && existe_turma2).toEqual(true);
        }).catch(e => expect(e).toEqual(null));
    });
    it("Cadastro de aluno durante a criação de uma turma - bem sucecido", () => {
        let professor_test = new professor_1.Professor('999.222.555-66', 'Lucas', 'lucas@ufpe.br', '4444');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': professor_test });
        let usuario_test = new aluno_1.Aluno('936.327.123-21', 'Rafaela', 'rafael@ufpe.br', '2222');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': usuario_test });
        let infos = { "email": 'lucas@ufpe.br', "senha": '4444' };
        request.post({ 'url': base_url + 'login', 'form': infos });
        let turma_teste1 = { 'nome': 'Calculo 2', 'codigo': 'IF777', 'semestre': '2º' };
        request.post({ 'url': base_url + 'criar_turma', 'form': turma_teste1 });
        let info_turma = { "codigo": 'IF777' };
        request.post({ 'url': base_url + 'envia_turma', 'form': info_turma });
        let convite = { "email": 'rafael@ufpe.br' };
        return request.post({ 'url': base_url + 'convidar_aluno', 'form': convite }).then(body => {
            body = JSON.parse(body);
            expect(body).toEqual({ "success": "Usuario convidado com sucesso!" });
        }).catch(e => expect(e).toEqual(null));
    });
    it("Cadastro de um aluno durante a criação de uma turma - mal sucessido", () => {
        let professor_test = new professor_1.Professor('888.222.555-66', 'Jefersson', 'jef@ufpe.br', '4444');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': professor_test });
        let infos = { "email": 'jef@ufpe.br', "senha": '4444' };
        request.post({ 'url': base_url + 'login', 'form': infos });
        let turma_teste1 = { 'nome': 'Calculo 3', 'codigo': 'IF778', 'semestre': '3º' };
        request.post({ 'url': base_url + 'criar_turma', 'form': turma_teste1 });
        let info_turma = { "codigo": 'IF778' };
        request.post({ 'url': base_url + 'envia_turma', 'form': info_turma });
        let convite = { "email": '' };
        return request.post({ 'url': base_url + 'convidar_aluno', 'form': convite }).then(body => {
            body = JSON.parse(body);
            expect(body).toEqual({ "failure": "O email do convite não pode ser vazio!" });
        }).catch(e => expect(e).toEqual(null));
    });
    it("Aceitação do convite pelo aluno", () => {
        let usuario_test = new aluno_1.Aluno('100.327.123-21', 'Igor', 'igor@ufpe.br', '2222');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': usuario_test });
        let professor_test = new professor_1.Professor('200.222.555-66', 'Marcio', 'marcio@ufpe.br', '4444');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': professor_test });
        let infos = { "email": 'marcio@ufpe.br', "senha": '4444' };
        request.post({ 'url': base_url + 'login', 'form': infos });
        let turma_teste1 = { 'nome': 'Fisica Experimental', 'codigo': 'IF858', 'semestre': '4º' };
        request.post({ 'url': base_url + 'criar_turma', 'form': turma_teste1 });
        let info_turma = { "codigo": 'IF858' };
        request.post({ 'url': base_url + 'envia_turma', 'form': info_turma });
        let convite = { "email": 'igor@ufpe.br' };
        request.post({ 'url': base_url + 'convidar_aluno', 'form': convite });
        request.post({ 'url': base_url + 'desloga', 'form': null });
        let info_aluno = { "email": 'igor@ufpe.br', "senha": '2222' };
        request.post({ 'url': base_url + 'login', 'form': info_aluno });
        let res_convite = { "codigo": 'IF858', "flag": true };
        return request.post({ 'url': base_url + 'atualiza_convite', 'form': res_convite }).then(body => {
            body = JSON.parse(body);
            expect(body).toEqual({ "success": "Convite aceito com sucesso!" });
        }).catch(e => expect(e).toEqual(null));
    });
});
//# sourceMappingURL=server.spec.js.map