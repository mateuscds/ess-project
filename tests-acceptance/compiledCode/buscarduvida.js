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
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let path = require('path');
//import request = require("request-promise");
function wait(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    });
}
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na página "Buscar Duvida"$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('Gui');
        yield protractor_1.$("a[name='buscar_duvida']").click();
    }));
    Then(/^‘Paulo Henrique Monteiro Borba’ não está na base de currículos$/, () => __awaiter(this, void 0, void 0, function* () {
        var allpesquisadores = protractor_1.element.all(protractor_1.by.name('Paulo Henrique Monteiro Borba'));
        yield allpesquisadores;
        yield allpesquisadores.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    }));
    When(/^Eu crio um novo currículo com os dados de ‘Paulo Henrique Monteiro Borba’ , presentes no arquivo ‘paulo_lattes.xml’$/, () => __awaiter(this, void 0, void 0, function* () {
        let fileDir = path.join(__dirname, '/support_files/paulo_lattes.xml');
        yield protractor_1.$("input[name='file']").sendKeys(fileDir);
        // time to upload
        yield wait(500);
    }));
    When(/^Eu crio um novo currículo com os dados de ‘paulo_lattes.json’$/, () => __awaiter(this, void 0, void 0, function* () {
        let fileDir = path.join(__dirname, '/support_files/paulo_lattes.json');
        yield protractor_1.$("input[name='file']").sendKeys(fileDir);
        // time to upload
        yield wait(500);
    }));
    When(/^Eu seleciono ‘Paulo Henrique Monteiro Borba’$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("div[name='selecionaPaulo Henrique Monteiro Borba']").click();
    }));
    When(/^Seleciono a opção de remover o currículo de ‘Paulo Henrique Monteiro Borba’$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("button[name='removerPaulo Henrique Monteiro Borba']").click();
    }));
    When(/^Seleciono a opção de atualizar o currículo de ‘Paulo Henrique Monteiro Borba’ com os dados de ‘paulo_lattes2.xml’$/, () => __awaiter(this, void 0, void 0, function* () {
        let fileDir = path.join(__dirname, '/support_files/paulo_lattes2.xml');
        yield protractor_1.$("input[name='atualizarPaulo Henrique Monteiro Borba']").sendKeys(fileDir);
        // time to upload
        yield wait(500);
    }));
    When(/^Seleciono a opção de atualizar o currículo de ‘Paulo Henrique Monteiro Borba’ com os dados de ‘paulo_lattes.json’$/, () => __awaiter(this, void 0, void 0, function* () {
        let fileDir = path.join(__dirname, '/support_files/paulo_lattes.json');
        yield protractor_1.$("input[name='atualizarPaulo Henrique Monteiro Borba']").sendKeys(fileDir);
        // time to upload
        yield wait(500);
    }));
    When(/^Seleciono a opção de continuar com a atualização$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("button[name='atualizarModal']").click();
    }));
    Then(/^Recebo uma mensagem indicando o sucesso da criação$/, () => __awaiter(this, void 0, void 0, function* () {
        var el = protractor_1.element(protractor_1.by.id('notificatxt'));
        yield el;
        let txt = Promise.resolve(el.getText());
        yield txt;
        yield txt.then(expect(Promise.resolve(el.getText())).to.eventually.equal("Pesquisador adicionado com sucesso"));
    }));
    Then(/^Recebo uma mensagem indicando o sucesso da atualização$/, () => __awaiter(this, void 0, void 0, function* () {
        var el = protractor_1.element(protractor_1.by.id('notificatxt'));
        yield el;
        let txt = Promise.resolve(el.getText());
        yield txt;
        yield txt.then(expect(Promise.resolve(el.getText())).to.eventually.equal("Pesquisador atualizado com sucesso"));
    }));
    Then(/^Recebo uma mensagem indicando que o currículo já está cadastrado e será atualizado$/, () => __awaiter(this, void 0, void 0, function* () {
        var el = protractor_1.element(protractor_1.by.id('notificatxt'));
        yield el;
        let txt = Promise.resolve(el.getText());
        yield txt;
        yield txt.then(expect(Promise.resolve(el.getText())).to.eventually.equal("O pesquisador já existe na base de dados"));
    }));
    Then(/^Recebo uma mensagem indicando a falha da criação devido a problemas com os dados passados$/, () => __awaiter(this, void 0, void 0, function* () {
        var el = protractor_1.element(protractor_1.by.id('notificatxt'));
        yield el;
        let txt = Promise.resolve(el.getText());
        yield txt;
        yield txt.then(expect(Promise.resolve(el.getText())).to.eventually.equal("Erro ao adicionar o pesquisador"));
    }));
    Then(/^‘Paulo Henrique Monteiro Borba’ está na base de currículos$/, () => __awaiter(this, void 0, void 0, function* () {
        var allpesquisadores = protractor_1.element.all(protractor_1.by.name('Paulo Henrique Monteiro Borba'));
        yield allpesquisadores;
        yield allpesquisadores.then(elems => expect(Promise.resolve(elems.length)).to.eventually.not.equal(0));
    }));
    Then(/^Não consigo visualizar os dados de ‘Paulo Henrique Monteiro Borba’ na base de currículos$/, () => __awaiter(this, void 0, void 0, function* () {
        var allpesquisadores = protractor_1.element.all(protractor_1.by.name('Paulo Henrique Monteiro Borba'));
        yield allpesquisadores;
        yield allpesquisadores.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    }));
    Then(/^‘Paulo Henrique Monteiro Borba’ está na base de currículos com os dados atualizados$/, () => __awaiter(this, void 0, void 0, function* () {
        var allpesquisadores = protractor_1.element.all(protractor_1.by.name('publicao9395715443254344'));
        yield allpesquisadores;
        yield allpesquisadores.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(2));
    }));
    Then(/^‘Paulo Henrique Monteiro Borba’ está na base de currículos com 2 artigos$/, () => __awaiter(this, void 0, void 0, function* () {
        var allpesquisadores = protractor_1.element.all(protractor_1.by.name('publicao9395715443254344'));
        yield allpesquisadores;
        yield allpesquisadores.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(2));
    }));
    Then(/^‘Paulo Henrique Monteiro Borba’ está na base de currículos com 1 artigos$/, () => __awaiter(this, void 0, void 0, function* () {
        var allpesquisadores = protractor_1.element.all(protractor_1.by.name('publicao9395715443254344'));
        yield allpesquisadores;
        yield allpesquisadores.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    Then(/^Recebo uma mensagem indicando o sucesso da remoção$/, () => __awaiter(this, void 0, void 0, function* () {
        var el = protractor_1.element(protractor_1.by.id('notificatxt'));
        yield el;
        let txt = Promise.resolve(el.getText());
        yield txt;
        yield txt.then(expect(Promise.resolve(el.getText())).to.eventually.equal("Pesquisador apagado com sucesso"));
    }));
    //attr.name="remover{{p.nome}}"
});
