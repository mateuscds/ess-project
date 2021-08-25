const { BeforeAll, After, AfterAll, Status } = require("cucumber");
import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, $$, promise } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let path = require('path');
//import request = require("request-promise");

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^Eu estou na página "Duivda"$/,{timeout: 100 * 1000}, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Gui');
        await $("a[name='duvidalink']").click();
        wait(1000);
      });
    
    Then(/^Seja selecionada a opção para responder uma dúvida "$/,{timeout: 100 * 1000}, async (titulo) => {
        await $("a[name='responderlink']").click();
    });

    When(/^o estudante preenche a DESCRICAO "([^\"]*)" e o NUMERO DA DUVIDA "([^\"]*)" $/, {timeout: 100 * 1000}, async (discursao, id) => {
        await element.all(by.name('respostabox')).sendKeys('As requisitos funcionais são...');
        await element.all(by.name('numerobox')).sendKeys('3');
    });

    When('O estudante preenche a RESPOSTA {stringInDoubleQuotes}', {timeout: 100 * 1000}, async (discursao) => {
        await element.all(by.name('respostabox')).sendKeys('Os requisitos não funcionais são...');
        await element.all(by.name('numerobox')).sendKeys('');
    });

    Then(/^solicita a publicação da resposta$/, {timeout: 100 * 1000}, async () => {
      await element.all(by.name('resposta_')).click();
    });

    Then(/^Aparece uma mensagem de confirmação do cadastro na tela$/, {timeout: 100 * 1000}, async () => {
      await expect(element.all(by.name('notificatxt_resposta')).getText()).to.eventually.equal("Resposta cadastrada com sucesso!");
    });
    
    Then('Aparece uma mensagem informando que algum campo está em branco.', {timeout: 100 * 1000}, async (elemento) => {
        await expect(element.all(by.name('notificatxt_resposta')).getText()).to.eventually.equal("Alguma das entradas esta nula!");
      });

})