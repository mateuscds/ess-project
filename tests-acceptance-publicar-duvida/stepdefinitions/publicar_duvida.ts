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
    
    Then(/^Seja selecionada a opção para publicar uma dúvida "$/,{timeout: 100 * 1000}, async (titulo) => {
        await $("a[name='publicarlink']").click();
    });

    Then('Exista uma dúvida cadastrada com o TITULO {stringInDoubleQuotes}', {timeout: 100 * 1000}, async (titulo) => {

      await element.all(by.name('titulobox')).sendKeys(<string> titulo);
      await element.all(by.name('statusbox')).sendKeys('true');
      await element.all(by.name('assuntobox')).sendKeys('Testes');
      await element.all(by.name('descricaobox')).sendKeys('Quais s');

      await element.all(by.name('botao_publicar')).click();

      await expect(element.all(by.name('notificatxt_publicacao')).getText()).to.eventually.equal("Duvida cadastrada com sucesso!");

      await element.all(by.name('titulobox')).clear();
      await element.all(by.name('statusbox')).clear();
      await element.all(by.name('assuntobox')).clear();
      await element.all(by.name('descricaobox')).clear();
    });

    When(/^o estudante preenche o TITULO "([^\"]*)", o ASSUNTO "([^\"]*)" e a DESCRICAO "([^\"]*)"'$/, {timeout: 100 * 1000}, async (titulo, True, assunto, descricao) => {
        await element.all(by.name('titulobox')).sendKeys('Diferenças entre os requisitos funcionais e não funcionais');
        await element.all(by.name('statusbox')).sendKeys('true');
        await element.all(by.name('assuntobox')).sendKeys("Requisitos");
        await element.all(by.name('descricaobox')).sendKeys('Não compreendi muito bem as diferenças entre esses dois tipos de requisitos');
    });

    When('O estudante preenche TITULO {stringInDoubleQuotes}, STATUS {stringInDoubleQuotes} e ASSUNTO {stringInDoubleQuotes}', {timeout: 100 * 1000}, async (cpf, nome, senha) => {
      await element.all(by.name('titulobox')).sendKeys('Diferenças entre os requisitos funcionais e não funcionais');
      await element.all(by.name('statusbox')).sendKeys('true');
      await element.all(by.name('assuntobox')).sendKeys("Requisitos");
      await element.all(by.name('descricaobox')).sendKeys('');
    });

    When(/^solicita a publicação da duvida$/, {timeout: 100 * 1000}, async () => {
      await element.all(by.name('botao_publicar')).click();
    });

    Then(/^Aparece uma mensagem de confirmação do cadastro na tela$/, {timeout: 100 * 1000}, async () => {
      await expect(element.all(by.name('notificatxt_publicacao')).getText()).to.eventually.equal("Duvida cadastrada com sucesso!");
    });

    Then('Aparece uma mensagem informando que a dúvida já tinha sido cadastrada.', {timeout: 100 * 1000}, async (elemento) => {
      await expect(element.all(by.name('notificatxt_publicacao')).getText()).to.eventually.equal("Uma duvida com esse TITULO ja existe na base de dados!");
    });

    Then('Aparece uma mensagem informando que algum campo está em branco.', {timeout: 100 * 1000}, async (elemento) => {
      await expect(element.all(by.name('notificatxt_publicacao')).getText()).to.eventually.equal("Alguma das entradas esta nula!");
    });
    
})