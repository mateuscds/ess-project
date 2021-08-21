"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { BeforeAll, After, AfterAll, Status } = require("cucumber");
const protractor_1 = require("protractor");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let path = require('path');
function wait(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    });
}
var { defineSupportCode } = require('cucumber');
defineSupportCode(function ({ Given, When, Then }) {
    Given(/^que o usuário esteja na página de cadastro do sistema$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('Gui');
        yield protractor_1.$("a[name='cadastrar']").click();
    }));
    Given(/^que o usuário esteja na página de login do sistema$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('Gui');
        yield protractor_1.$("a[name='login']").click();
    }));
    Given(/^seja selecionada a opção de cadastro de aluno$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('aluno')).click();
    }));
    Given(/^seja selecionada a opção de cadastro de professor$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('prof_monitor')).click();
    }));
    Given('exista um usuário cadastrado com o CPF {stringInDoubleQuotes}', { timeout: 100 * 1000 }, (cpf) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('cpf')).sendKeys(cpf);
        yield protractor_1.element(protractor_1.by.id('nome')).sendKeys('Mariana');
        yield protractor_1.element(protractor_1.by.id('email')).sendKeys('mariana@ufpe.br');
        yield protractor_1.element(protractor_1.by.id('senha')).sendKeys('2739314e2');
        yield protractor_1.element(protractor_1.by.id('botao_cadastro')).click();
        yield expect(protractor_1.element(protractor_1.by.id('notificatxt')).getText()).to.eventually.equal("Usuario cadastrado com sucesso!");
        yield protractor_1.element(protractor_1.by.id('cpf')).clear();
        yield protractor_1.element(protractor_1.by.id('nome')).clear();
        yield protractor_1.element(protractor_1.by.id('email')).clear();
        yield protractor_1.element(protractor_1.by.id('senha')).clear();
    }));
    Given('exista um usuário cadastrado com o E-MAIL {stringInDoubleQuotes}', { timeout: 100 * 1000 }, (email) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('cpf')).sendKeys('324.645.123-87');
        yield protractor_1.element(protractor_1.by.id('nome')).sendKeys('Rafaela');
        yield protractor_1.element(protractor_1.by.id('email')).sendKeys(email);
        yield protractor_1.element(protractor_1.by.id('senha')).sendKeys('138138w1');
        yield protractor_1.element(protractor_1.by.id('botao_cadastro')).click();
        yield expect(protractor_1.element(protractor_1.by.id('notificatxt')).getText()).to.eventually.equal("Usuario cadastrado com sucesso!");
        yield protractor_1.element(protractor_1.by.id('cpf')).clear();
        yield protractor_1.element(protractor_1.by.id('nome')).clear();
        yield protractor_1.element(protractor_1.by.id('email')).clear();
        yield protractor_1.element(protractor_1.by.id('senha')).clear();
    }));
    Given('existe um usuário cadastrado com E-MAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes}', { timeout: 100 * 1000 }, (email, senha) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='cadastrar']").click();
        yield protractor_1.element(protractor_1.by.id('cpf')).sendKeys('133.345.756-46');
        yield protractor_1.element(protractor_1.by.id('nome')).sendKeys('Jefferson');
        yield protractor_1.element(protractor_1.by.id('email')).sendKeys(email);
        yield protractor_1.element(protractor_1.by.id('senha')).sendKeys(senha);
        yield protractor_1.element(protractor_1.by.id('botao_cadastro')).click();
        yield expect(protractor_1.element(protractor_1.by.id('notificatxt')).getText()).to.eventually.equal("Usuario cadastrado com sucesso!");
        yield protractor_1.element(protractor_1.by.id('cpf')).clear();
        yield protractor_1.element(protractor_1.by.id('nome')).clear();
        yield protractor_1.element(protractor_1.by.id('email')).clear();
        yield protractor_1.element(protractor_1.by.id('senha')).clear();
        yield protractor_1.$("a[name='login']").click();
    }));
    When('o usuário preenche o CPF {stringInDoubleQuotes}, o NOME {stringInDoubleQuotes}, o E-MAIL {stringInDoubleQuotes} e a SENHA {stringInDoubleQuotes}', { timeout: 100 * 1000 }, (cpf, nome, email, senha) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('cpf')).sendKeys(cpf);
        yield protractor_1.element(protractor_1.by.id('nome')).sendKeys(nome);
        yield protractor_1.element(protractor_1.by.id('email')).sendKeys(email);
        yield protractor_1.element(protractor_1.by.id('senha')).sendKeys(senha);
    }));
    When('o usuário preenche NOME {stringInDoubleQuotes}, o E-MAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes}', { timeout: 100 * 1000 }, (nome, email, senha) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('cpf')).sendKeys('');
        yield protractor_1.element(protractor_1.by.id('nome')).sendKeys(nome);
        yield protractor_1.element(protractor_1.by.id('email')).sendKeys(email);
        yield protractor_1.element(protractor_1.by.id('senha')).sendKeys(senha);
    }));
    When('o usuário preenche CPF {stringInDoubleQuotes}, NOME {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes}', { timeout: 100 * 1000 }, (cpf, nome, senha) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('cpf')).sendKeys(cpf);
        yield protractor_1.element(protractor_1.by.id('nome')).sendKeys(nome);
        yield protractor_1.element(protractor_1.by.id('email')).sendKeys('');
        yield protractor_1.element(protractor_1.by.id('senha')).sendKeys(senha);
    }));
    When('o usuário preencher E-MAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes}', { timeout: 100 * 1000 }, (email, senha) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('email')).sendKeys(email);
        yield protractor_1.element(protractor_1.by.id('senha')).sendKeys(senha);
    }));
    When(/^solicita a realização do cadastro$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('botao_cadastro')).click();
    }));
    When(/^solicia a realização do login$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('botao_login')).click();
    }));
    Then(/^aparece uma mensagem de confirmação do cadastro na tela$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.element(protractor_1.by.id('notificatxt')).getText()).to.eventually.equal("Usuario cadastrado com sucesso!");
    }));
    Then('aparece uma mensagem de erro na tela, informando que o cadastro não foi concluído e que já existe um usuário com esse {stringInDoubleQuotes}', { timeout: 100 * 1000 }, (elemento) => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.element(protractor_1.by.id('notificatxt')).getText()).to.eventually.equal("Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!");
    }));
    Then('aparece uma mensagem de erro na tela, informando que o cadastro não foi concluído pois o campo {stringInDoubleQuotes} não foi preenchido', { timeout: 100 * 1000 }, (elemento) => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.element(protractor_1.by.id('notificatxt')).getText()).to.eventually.equal("Alguma das entradas esta nula!");
    }));
    Then('o login é concluído com sucesso e é iniciada uma sessão para o usuário de E-MAIL {stringInDoubleQuotes}', { timeout: 100 * 1000 }, (usuario) => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.element(protractor_1.by.id('titulo')).getText()).to.eventually.equal("MINHA CONTA");
    }));
    Then(/^o login não é concluído e aparece uma mensagem informando que alguma informação está incorreta$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.element(protractor_1.by.id('notificatxt')).getText()).to.eventually.equal("E-mail ou senha incorretos!");
    }));
});
