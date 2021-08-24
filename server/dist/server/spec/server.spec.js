"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
const fs = require('fs');
let path = require('path');
const professor_1 = require("../../common/professor");
const aluno_1 = require("../../common/aluno");
const notificador_1 = require("../../common/notificador");
var base_url = "http://localhost:3000/";
describe("O servidor", () => {
    var server;
    beforeAll(() => { server = require('../server'); });
    afterAll(() => { server.closeServer(); });
    it("notificador de aluno recém cadastrado é criado", () => {
        let aluno = new aluno_1.Aluno('111.222.333-44', 'lucas', 'lucas@ufpe.br', '123');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': aluno });
        return request.get(base_url + "notificador").then(body => {
            body = JSON.parse(body);
            let existe = false;
            console.log(body);
            for (let n of body) {
                let notificador_aux = new notificador_1.Notificador('');
                Object.assign(notificador_aux, n);
                console.log(notificador_aux.Cpf_user);
                if (notificador_aux.Cpf_user == aluno.Cpf) {
                    existe = true;
                    break;
                }
            }
            expect(existe).toEqual(true);
        }).catch(e => expect(e).toEqual(null));
    });
    it("notificador de professor recém cadastrado é criado", () => {
        let prof = new professor_1.Professor('111.222.333-44', 'lucas', 'lucas@ufpe.br', '123');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': prof });
        return request.get(base_url + "notificador").then(body => {
            body = JSON.parse(body);
            let existe = false;
            console.log(body);
            for (let n of body) {
                let notificador_aux = new notificador_1.Notificador('');
                Object.assign(notificador_aux, n);
                console.log(notificador_aux.Cpf_user);
                if (notificador_aux.Cpf_user == prof.Cpf) {
                    existe = true;
                    break;
                }
            }
            expect(existe).toEqual(true);
        }).catch(e => expect(e).toEqual(null));
    });
    it("limpar notificador de professor", () => {
        let prof = new professor_1.Professor('111.222.333-44', 'lucas', 'lucas@ufpe.br', '123');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': prof });
        request.post({ 'url': base_url + 'set_notificador', 'form': { 'cpf': prof.Cpf, 'msg': "Teste", 'tipo': "att" } });
        request.post({ 'url': base_url + 'login', 'form': { 'email': prof.Email, 'senha': prof.Senha } });
        request.get({ 'url': base_url + 'limpar' });
        return request.get(base_url + "notificador").then(body => {
            body = JSON.parse(body);
            let flag = false;
            for (let n of body) {
                let notificador_aux = new notificador_1.Notificador('');
                Object.assign(notificador_aux, n);
                if (notificador_aux.Cpf_user == prof.Cpf) {
                    if (notificador_aux.notificacoes.length == 0) {
                        flag = true;
                        break;
                    }
                }
            }
            expect(flag).toEqual(true);
        }).catch(e => expect(e).toEqual(null));
    });
    it("limpar notificador de aluno", () => {
        let aluno = new aluno_1.Aluno('111.222.333-44', 'lucas', 'lucas@ufpe.br', '123');
        request.post({ 'url': base_url + 'usuarios/cadastrar', 'form': aluno });
        request.post({ 'url': base_url + 'set_notificador', 'form': { 'cpf': aluno.Cpf, 'msg': "Teste", 'tipo': "att" } });
        request.post({ 'url': base_url + 'login', 'form': { 'email': aluno.Email, 'senha': aluno.Senha } });
        request.get({ 'url': base_url + 'limpar' });
        return request.get(base_url + "notificador").then(body => {
            body = JSON.parse(body);
            let flag = false;
            for (let n of body) {
                let notificador_aux = new notificador_1.Notificador('');
                Object.assign(notificador_aux, n);
                if (notificador_aux.Cpf_user == aluno.Cpf) {
                    if (notificador_aux.notificacoes.length == 0) {
                        flag = true;
                        break;
                    }
                }
            }
            expect(flag).toEqual(true);
        }).catch(e => expect(e).toEqual(null));
    });
});
//# sourceMappingURL=server.spec.js.map