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
    Given("que o professor de CPF {stringInDoubleQuotes}, NOME {stringInDoubleQuotes}, EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} está logado no sistema", { timeout: 100 * 1000 }, (cpf, nome, email, senha) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('Gui');
        yield protractor_1.$("a[name='cadastrar']").click();
        yield protractor_1.element(protractor_1.by.id('cpf')).sendKeys(cpf);
        yield protractor_1.element(protractor_1.by.id('nome')).sendKeys(nome);
        yield protractor_1.element(protractor_1.by.id('email')).sendKeys(email);
        yield protractor_1.element(protractor_1.by.id('senha')).sendKeys(senha);
        yield protractor_1.element(protractor_1.by.id('botao_cadastro')).click();
        yield protractor_1.$("a[name='login']").click();
        yield protractor_1.element(protractor_1.by.id('email')).sendKeys(email);
        yield protractor_1.element(protractor_1.by.id('senha')).sendKeys(senha);
        yield protractor_1.element(protractor_1.by.id('botao_login')).click();
    }));
    Given("que o aluno de CPF {stringInDoubleQuotes}, NOME {stringInDoubleQuotes}, EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} está cadastrado no sistema", { timeout: 100 * 1000 }, (cpf, nome, email, senha) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('Gui');
        yield protractor_1.$("a[name='cadastrar']").click();
        yield protractor_1.element(protractor_1.by.id('cpf')).sendKeys(cpf);
        yield protractor_1.element(protractor_1.by.id('nome')).sendKeys(nome);
        yield protractor_1.element(protractor_1.by.id('email')).sendKeys(email);
        yield protractor_1.element(protractor_1.by.id('senha')).sendKeys(senha);
        yield protractor_1.element(protractor_1.by.id('aluno')).click();
        yield protractor_1.element(protractor_1.by.id('botao_cadastro')).click();
    }));
    Given(/^esta na página de criação de turma$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='criar_turma']").click();
    }));
    Given("existe a turma de NOME {stringInDoubleQuotes}, CODIGO {stringInDoubleQuotes} e SEMESTRE {stringInDoubleQuotes}", { timeout: 100 * 1000 }, (nome, codigo, semestre) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='criar_turma']").click();
        yield protractor_1.element(protractor_1.by.id('nome')).sendKeys(nome);
        yield protractor_1.element(protractor_1.by.id('codigo')).sendKeys(codigo);
        yield protractor_1.element(protractor_1.by.id('semestre')).sendKeys(semestre);
        yield protractor_1.element(protractor_1.by.id('botao_criar_turma')).click();
    }));
    Given("o professor esta na página de gerenciamento dessa turma de código {stringInDoubleQuotes}", { timeout: 100 * 1000 }, (codigo) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='minhas_turmas']").click();
        var str1 = new String("a[name='");
        var str2 = new String("']");
        var str3 = str1.concat(codigo.toString()).concat(str2.toString());
        yield protractor_1.$(str3).click();
    }));
    Given("que o professor de CPF {stringInDoubleQuotes}, NOME {stringInDoubleQuotes}, EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} responsável pela turma de NOME {stringInDoubleQuotes}, CODIGO {stringInDoubleQuotes} e SEMESTRE {stringInDoubleQuotes} tenha enviado um convite para o aluno de EMAIL {stringInDoubleQuotes}", { timeout: 100 * 1000 }, (cpf, nome_prof, email_prof, senha, nome_turma, codigo, semestre, email_aluno) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('cpf')).clear();
        yield protractor_1.element(protractor_1.by.id('nome')).clear();
        yield protractor_1.element(protractor_1.by.id('email')).clear();
        yield protractor_1.element(protractor_1.by.id('senha')).clear();
        yield protractor_1.element(protractor_1.by.id('cpf')).sendKeys(cpf);
        yield protractor_1.element(protractor_1.by.id('nome')).sendKeys(nome_prof);
        yield protractor_1.element(protractor_1.by.id('email')).sendKeys(email_prof);
        yield protractor_1.element(protractor_1.by.id('senha')).sendKeys(senha);
        yield protractor_1.element(protractor_1.by.id('prof_monitor')).click();
        yield protractor_1.element(protractor_1.by.id('botao_cadastro')).click();
        yield protractor_1.$("a[name='login']").click();
        yield protractor_1.element(protractor_1.by.id('email')).sendKeys(email_prof);
        yield protractor_1.element(protractor_1.by.id('senha')).sendKeys(senha);
        yield protractor_1.element(protractor_1.by.id('botao_login')).click();
        yield protractor_1.$("a[name='criar_turma']").click();
        yield protractor_1.element(protractor_1.by.id('nome')).sendKeys(nome_turma);
        yield protractor_1.element(protractor_1.by.id('codigo')).sendKeys(codigo);
        yield protractor_1.element(protractor_1.by.id('semestre')).sendKeys(semestre);
        yield protractor_1.element(protractor_1.by.id('botao_criar_turma')).click();
        yield expect(protractor_1.element(protractor_1.by.id('notificatxt')).getText()).to.eventually.equal("Turma cadastrada com sucesso!");
        yield protractor_1.$("a[name='minhas_turmas']").click();
        var str1 = new String("a[name='");
        var str2 = new String("']");
        var str3 = str1.concat(codigo.toString()).concat(str2.toString());
        yield protractor_1.$(str3).click();
        yield protractor_1.element(protractor_1.by.id('email_aluno')).sendKeys(email_aluno);
        yield protractor_1.element(protractor_1.by.id('convida_aluno')).click();
    }));
    Given("o aluno de EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} esteja logado no sistema", { timeout: 100 * 1000 }, (email, senha) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='login']").click();
        yield protractor_1.element(protractor_1.by.id('email')).sendKeys(email);
        yield protractor_1.element(protractor_1.by.id('senha')).sendKeys(senha);
        yield protractor_1.element(protractor_1.by.id('botao_login')).click();
    }));
    Given(/^o aluno esteja na página de minhas turmas$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='minhas_turmas']").click();
    }));
    When("ele preenche as informações de nome, código e semestre da turma com {stringInDoubleQuotes},  {stringInDoubleQuotes} e {stringInDoubleQuotes}, respectivamente.", { timeout: 100 * 1000 }, (nome, codigo, semestre) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('nome')).sendKeys(nome);
        yield protractor_1.element(protractor_1.by.id('codigo')).sendKeys(codigo);
        yield protractor_1.element(protractor_1.by.id('semestre')).sendKeys(semestre);
    }));
    When(/^solicita cadastrar a turma$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('botao_criar_turma')).click();
    }));
    When("ele preenche as informações de código e semestre da turma com {stringInDoubleQuotes} e {stringInDoubleQuotes}, respectivamente.", { timeout: 100 * 1000 }, (codigo, semestre) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('nome')).sendKeys('');
        yield protractor_1.element(protractor_1.by.id('codigo')).sendKeys(codigo);
        yield protractor_1.element(protractor_1.by.id('semestre')).sendKeys(semestre);
    }));
    When("quando ele preencher o aluno de EMAIL {stringInDoubleQuotes}", { timeout: 100 * 1000 }, (email) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('email_aluno')).sendKeys(email);
    }));
    When(/^solicitar que o convite seja enviado$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('convida_aluno')).click();
    }));
    When("quando o aluno solicitar aceitar o convite enviado referente à turma de código {stringInDoubleQuotes}", { timeout: 100 * 1000 }, (codigo) => __awaiter(this, void 0, void 0, function* () {
        var str1 = new String("botao_aceitar_");
        var str2 = str1.concat(codigo.toString());
        yield protractor_1.element(protractor_1.by.id(str2)).click();
    }));
    Then(/^ele consegue visualizar uma mensagem avisando que o cadastro da turma foi feito com sucesso.$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.element(protractor_1.by.id('notificatxt')).getText()).to.eventually.equal("Turma cadastrada com sucesso!");
    }));
    Then(/^ele consegue visualizar uma mensagem avisando que o cadastro não pode ser realizado$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.element(protractor_1.by.id('notificatxt')).getText()).to.eventually.equal("Nome, codigo ou semestre nulos!");
    }));
    Then(/^ele consegue visualizar uma mensagem informando que o convite foi enviado com sucesso$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.element(protractor_1.by.id('notificatxt')).getText()).to.eventually.equal("Usuario convidado com sucesso!");
    }));
    Then(/^ele consegue visualizar uma mensagem informando que o convite não foi enviado com sucesso$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.element(protractor_1.by.id('notificatxt')).getText()).to.eventually.equal("O email do convite não pode ser vazio!");
    }));
    Then("ele consegue visualizar que as opções de aceitar e rejeitar o convite da turma de código {stringInDoubleQuotes} desaparecem da tela.", { timeout: 100 * 1000 }, (codigo) => __awaiter(this, void 0, void 0, function* () {
        var str1 = new String("botao_aceitar_");
        var str2 = str1.concat(codigo.toString());
        var flag1 = false, flag2 = false;
        yield expect(protractor_1.element(protractor_1.by.id(str2)).isDisplayed().then(function (visible) {
            if (visible) {
                flag1 = true;
            }
            else {
                flag1 = false;
            }
        }));
        var str3 = new String("botao_rejeitar_");
        var str4 = str3.concat(codigo.toString());
        yield expect(protractor_1.element(protractor_1.by.id(str4)).isDisplayed().then(function (visible) {
            if (visible) {
                flag2 = true;
            }
            else {
                flag2 = false;
            }
        }));
        yield expect(flag1 || flag2).to.equal(false);
    }));
});
