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
// let sameTitulo = ((elem, titulo) => elem.element(by.name('titulolist')).getText().then(text => text === titulo));
// let sameStatus = ((elem, status) => elem.element(by.status('nomelist')).getText().then(text => text === status));
let pAND = ((p, q) => p.then(a => q.then(b => a && b)));
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na página "Buscar Duvida"$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('Gui');
        yield protractor_1.$("a[name='buscar_duvida']").click();
    }));
    Given(/^Tenho uma dúvida com título "([^\"]*)" com estado "([^\"]*)"$/, { timeout: 100 * 1000 }, (titulo, estado) => __awaiter(this, void 0, void 0, function* () {
        var allduvidas = protractor_1.$$("tbody[class='corpo-duvidas'] > tr");
        yield allduvidas;
        var titulo_status = allduvidas.filter(row => {
            return pAND(row.$$("td").get(0).getText().then(curTitulo => {
                return curTitulo === titulo;
            }), row.$$("td").get(1).getText().then(curStatus => {
                return curStatus === estado;
            }));
        });
        yield titulo_status;
        yield titulo_status.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    When(/^Eu insiro a busca por "([^\"]*)"$/, (titulo) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='searchBar']").sendKeys(titulo);
        yield protractor_1.$("button[name='buttonSearch']").click();
    }));
    When(/^Seleciono a opção "([^\"]*)"$/, (estado) => __awaiter(this, void 0, void 0, function* () {
        var classe;
        if (estado === "Concluídas e Não concluídas")
            classe = 'bothOpt';
        else if (estado === "Concluídas")
            classe = 'conclOpt';
        else if (estado === "Não Concluídas")
            classe = 'nConclOpt';
        yield protractor_1.$(`input[class="${classe}"]`).click();
        yield protractor_1.$("button[name='buttonSearch']").click();
    }));
    When('Confirmo a busca', () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("button[name='buttonSearch']").click();
    }));
    Then(/^Eu continuo na página "Buscar Duvida"$/, () => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.browser.getCurrentUrl()).to.eventually.equal('http://localhost:4200/buscar_duvida');
    }));
    Then(/^Eu consigo ver somente a dúvida com título "([^\"]*)"$/, (titulo) => __awaiter(this, void 0, void 0, function* () {
        var allduvidas = protractor_1.$$("tbody[class='corpo-duvidas'] > tr");
        yield allduvidas;
        var titulos = allduvidas.filter(row => {
            return row.$$("td").get(0).getText().then(curTitulo => {
                return curTitulo === titulo;
            });
        });
        yield titulos;
        yield pAND(titulos.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)), allduvidas.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)));
    }));
    Then(/^Eu consigo ver escrito "Nenhuma Dúvida Encontrada"$/, () => __awaiter(this, void 0, void 0, function* () {
        var label = protractor_1.$$("h3[name='nenhumaduvida']");
        yield label;
        yield label.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    Then(/^Eu consigo ver a dúvida com título "([^\"]*)"$/, (titulo) => __awaiter(this, void 0, void 0, function* () {
        var allduvidas = protractor_1.$$("tbody[class='corpo-duvidas'] > tr");
        yield allduvidas;
        var titulos = allduvidas.filter(row => {
            return row.$$("td").get(0).getText().then(curTitulo => {
                return curTitulo === titulo;
            });
        });
        yield titulos;
        yield titulos.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    Then(/^Eu não consigo ver a dúvida com título "([^\"]*)"$/, (titulo) => __awaiter(this, void 0, void 0, function* () {
        var allduvidas = protractor_1.$$("tbody[class='corpo-duvidas'] > tr");
        yield allduvidas;
        var titulos = allduvidas.filter(row => {
            return row.$$("td").get(0).getText().then(curTitulo => {
                return curTitulo === titulo;
            });
        });
        yield titulos;
        yield titulos.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    }));
    //   Then(/^‘Paulo Henrique Monteiro Borba’ não está na base de currículos$/, async () => {
    //     var allpesquisadores: ElementArrayFinder = element.all(by.name('Paulo Henrique Monteiro Borba'));
    //     await allpesquisadores;
    //     await allpesquisadores.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    //   })
    //   When(/^Eu crio um novo currículo com os dados de ‘Paulo Henrique Monteiro Borba’ , presentes no arquivo ‘paulo_lattes.xml’$/, async () => {
    //     let fileDir = path.join(__dirname, '/support_files/paulo_lattes.xml')
    //     await $("input[name='file']").sendKeys(fileDir);
    //     // time to upload
    //     await wait(500);
    //   });
    //   When(/^Eu crio um novo currículo com os dados de ‘paulo_lattes.json’$/, async () => {
    //     let fileDir = path.join(__dirname, '/support_files/paulo_lattes.json')
    //     await $("input[name='file']").sendKeys(fileDir);
    //     // time to upload
    //     await wait(500);
    //   });
    //   When(/^Eu seleciono ‘Paulo Henrique Monteiro Borba’$/, async () => {
    //     await $("div[name='selecionaPaulo Henrique Monteiro Borba']").click();
    //   });
    //   When(/^Seleciono a opção de remover o currículo de ‘Paulo Henrique Monteiro Borba’$/, async () => {
    //     await $("button[name='removerPaulo Henrique Monteiro Borba']").click();
    //   });
    //   When(/^Seleciono a opção de atualizar o currículo de ‘Paulo Henrique Monteiro Borba’ com os dados de ‘paulo_lattes2.xml’$/, async () => {
    //     let fileDir = path.join(__dirname, '/support_files/paulo_lattes2.xml')
    //     await $("input[name='atualizarPaulo Henrique Monteiro Borba']").sendKeys(fileDir);
    //     // time to upload
    //     await wait(500);
    //   });
    //   When(/^Seleciono a opção de atualizar o currículo de ‘Paulo Henrique Monteiro Borba’ com os dados de ‘paulo_lattes.json’$/, async () => {
    //     let fileDir = path.join(__dirname, '/support_files/paulo_lattes.json')
    //     await $("input[name='atualizarPaulo Henrique Monteiro Borba']").sendKeys(fileDir);
    //     // time to upload
    //     await wait(500);
    //   });
    //   When(/^Seleciono a opção de continuar com a atualização$/, async () => {
    //     await $("button[name='atualizarModal']").click();
    //   });
    //   Then(/^Recebo uma mensagem indicando o sucesso da criação$/, async () => {
    //     var el = element(by.id('notificatxt'));
    //     await el;
    //     let txt = Promise.resolve(el.getText());
    //     await txt
    //     await txt.then(expect(Promise.resolve(el.getText())).to.eventually.equal("Pesquisador adicionado com sucesso"));
    //   });
    //   Then(/^Recebo uma mensagem indicando o sucesso da atualização$/, async () => {
    //     var el = element(by.id('notificatxt'));
    //     await el;
    //     let txt = Promise.resolve(el.getText());
    //     await txt
    //     await txt.then(expect(Promise.resolve(el.getText())).to.eventually.equal("Pesquisador atualizado com sucesso"));
    //   });
    //   Then(/^Recebo uma mensagem indicando que o currículo já está cadastrado e será atualizado$/, async () => {
    //     var el = element(by.id('notificatxt'));
    //     await el;
    //     let txt = Promise.resolve(el.getText());
    //     await txt
    //     await txt.then(expect(Promise.resolve(el.getText())).to.eventually.equal("O pesquisador já existe na base de dados"));
    //   });
    //   Then(/^Recebo uma mensagem indicando a falha da criação devido a problemas com os dados passados$/, async () => {
    //     var el = element(by.id('notificatxt'));
    //     await el;
    //     let txt = Promise.resolve(el.getText());
    //     await txt
    //     await txt.then(expect(Promise.resolve(el.getText())).to.eventually.equal("Erro ao adicionar o pesquisador"));
    //   });
    //   Then(/^‘Paulo Henrique Monteiro Borba’ está na base de currículos$/, async () => {
    //     var allpesquisadores: ElementArrayFinder = element.all(by.name('Paulo Henrique Monteiro Borba'));
    //     await allpesquisadores;
    //     await allpesquisadores.then(elems => expect(Promise.resolve(elems.length)).to.eventually.not.equal(0));
    //   })
    //   Then(/^Não consigo visualizar os dados de ‘Paulo Henrique Monteiro Borba’ na base de currículos$/, async () => {
    //     var allpesquisadores: ElementArrayFinder = element.all(by.name('Paulo Henrique Monteiro Borba'));
    //     await allpesquisadores;
    //     await allpesquisadores.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    //   })
    //   Then(/^‘Paulo Henrique Monteiro Borba’ está na base de currículos com os dados atualizados$/, async () => {
    //     var allpesquisadores: ElementArrayFinder = element.all(by.name('publicao9395715443254344'));
    //     await allpesquisadores;
    //     await allpesquisadores.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(2));
    //   })
    //   Then(/^‘Paulo Henrique Monteiro Borba’ está na base de currículos com 2 artigos$/, async () => {
    //     var allpesquisadores: ElementArrayFinder = element.all(by.name('publicao9395715443254344'));
    //     await allpesquisadores;
    //     await allpesquisadores.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(2));
    //   })
    //   Then(/^‘Paulo Henrique Monteiro Borba’ está na base de currículos com 1 artigos$/, async () => {
    //     var allpesquisadores: ElementArrayFinder = element.all(by.name('publicao9395715443254344'));
    //     await allpesquisadores;
    //     await allpesquisadores.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    //   })
    //   Then(/^Recebo uma mensagem indicando o sucesso da remoção$/, async () => {
    //     var el = element(by.id('notificatxt'));
    //     await el;
    //     let txt = Promise.resolve(el.getText());
    //     await txt
    //     await txt.then(expect(Promise.resolve(el.getText())).to.eventually.equal("Pesquisador apagado com sucesso"));
    //   });
    //attr.name="remover{{p.nome}}"
});
