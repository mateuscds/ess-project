"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
const fs = require('fs');
let path = require('path');
const professor_1 = require("../../common/professor");
const aluno_1 = require("../../common/aluno");
var base_url = "http://localhost:3000/";
describe("O servidor", () => {
    var server;
    beforeAll(() => { server = require('../server'); });
    afterAll(() => { server.closeServer(); });
    it("inicialmente retorna uma lista de usuários vazia", () => {
        return request.get(base_url + "usuario").then(body => expect(body).toBe("[]")).catch(e => expect(e).toEqual(null));
    });
    it("não remove usuário sem estar logado", () => {
        return request.get(base_url + "usuario")
            .then(body => {
            let res = body;
            return request.post(base_url + "deleta")
                .then(body => {
                body = JSON.parse(body);
                expect(body).toEqual({ "failure": "Nenhum usuario foi deletado do sistema!" });
                return request.get(base_url + "usuario").then(body => {
                    expect(body).toEqual(res);
                }).catch(e => expect(e).toEqual(null));
            }).catch(e => expect(e).toEqual(null));
        }).catch(e => expect(e).toEqual(null));
    });
    it("cadastro bem sucedido de aluno", () => {
        let aluno_test = new aluno_1.Aluno('111.222.333-44', 'João', 'joao@ufpe.br', '1234');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': aluno_test });
        return request.get(base_url + "usuario").then(body => {
            body = JSON.parse(body);
            let existe = false;
            for (let a of body) {
                let aluno_auxiliar = new aluno_1.Aluno('', '', '', '');
                Object.assign(aluno_auxiliar, a);
                if (aluno_auxiliar.Cpf == aluno_test.Cpf && aluno_auxiliar.hasOwnProperty('mascara')) {
                    existe = true;
                    break;
                }
            }
            expect(existe).toEqual(true);
        }).catch(e => expect(e).toEqual(null));
    });
    it("cadastro bem sucedido de professor", () => {
        let professor_test = new professor_1.Professor('155.266.377-44', 'Júlia', 'julia@ufpe.br', '1615');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': professor_test });
        return request.get(base_url + "usuario").then(body => {
            body = JSON.parse(body);
            let existe = false;
            for (let a of body) {
                let professor_auxiliar = new professor_1.Professor('', '', '', '');
                Object.assign(professor_auxiliar, a);
                if (professor_auxiliar.Cpf == professor_test.Cpf && !(professor_auxiliar.hasOwnProperty('mascara'))) {
                    existe = true;
                    break;
                }
            }
            expect(existe).toEqual(true);
        }).catch(e => expect(e).toEqual(null));
    });
    it("cadastro mal sucedido com CPF já cadastrado", () => {
        let usuario_test = new professor_1.Professor('999.888.777-66', 'Maria', 'maria@ufpe.br', '1111');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': usuario_test });
        return request.get(base_url + "usuario").then(body => {
            let res = body;
            let novo_usuario_test = new professor_1.Professor('999.888.777-66', 'Gabriel', 'gabriel@ufpe.br', '9876');
            return request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': novo_usuario_test }).then(body => {
                body = JSON.parse(body);
                expect(body).toEqual({ "failure": "Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!" });
                return request.get(base_url + "usuario").then(body => {
                    expect(body).toEqual(res);
                }).catch(e => expect(e).toEqual(null));
            }).catch(e => expect(e).toEqual(null));
        }).catch(e => expect(e).toEqual(null));
    });
    it("cadastro mal sucedido com EMAIL já cadastrado", () => {
        let usuario_test = new aluno_1.Aluno('936.327.123-21', 'Rafaela', 'rafael@ufpe.br', '2222');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': usuario_test });
        return request.get(base_url + "usuario").then(body => {
            let res = body;
            let novo_usuario_test = new aluno_1.Aluno('555.777.888-99', 'Rafael', 'rafael@ufpe.br', '1212');
            return request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': novo_usuario_test }).then(body => {
                body = JSON.parse(body);
                expect(body).toEqual({ "failure": "Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!" });
                return request.get(base_url + "usuario").then(body => {
                    //console.log('RES:', res);
                    //console.log('BODY:', body);
                    expect(body).toEqual(res);
                }).catch(e => expect(e).toEqual(null));
            }).catch(e => expect(e).toEqual(null));
        }).catch(e => expect(e).toEqual(null));
    });
    it("cadastro mal sucedido por falta de CPF", () => {
        let usuario_test = new aluno_1.Aluno('', 'Maria', 'maria@ufpe.br', '4545');
        return request.get(base_url + "usuario").then(body => {
            let res = body;
            return request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': usuario_test }).then(body => {
                body = JSON.parse(body);
                expect(body).toEqual({ "failure": "Alguma das entradas esta nula!" });
                return request.get(base_url + "usuario").then(body => {
                    expect(body).toEqual(res);
                }).catch(e => expect(e).toEqual(null));
            }).catch(e => expect(e).toEqual(null));
        }).catch(e => expect(e).toEqual(null));
    });
});
//# sourceMappingURL=server.spec.js.map