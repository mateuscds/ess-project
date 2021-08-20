const { BeforeAll, After, AfterAll, Status } = require("cucumber");
import { browser, $, element, ElementArrayFinder, Key, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let path = require('path');

async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({ Given, When, Then }) {
    
    Given(/^que o usuário esteja na página de cadastro do sistema$/, {timeout: 100 * 1000}, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Gui');
        await $("a[name='cadastrar']").click();
    });

    Given(/^que o usuário esteja na página de login do sistema$/, {timeout: 100 * 1000}, async () => {
      await browser.get("http://localhost:4200/");
      await expect(browser.getTitle()).to.eventually.equal('Gui');
      await $("a[name='login']").click();
    });

    Given(/^seja selecionada a opção de cadastro de aluno$/, {timeout: 100 * 1000}, async () => {
      await element(by.id('aluno')).click();
    });

    Given(/^seja selecionada a opção de cadastro de professor$/, {timeout: 100 * 1000}, async () => {
      await element(by.id('prof_monitor')).click();
    });

    Given('exista um usuário cadastrado com o CPF {stringInDoubleQuotes}', {timeout: 100 * 1000}, async (cpf) => {

      await element(by.id('cpf')).sendKeys(cpf);
      await element(by.id('nome')).sendKeys('Mariana');
      await element(by.id('email')).sendKeys('mariana@ufpe.br');
      await element(by.id('senha')).sendKeys('2739314e2');

      await element(by.id('botao_cadastro')).click();

      await expect(element(by.id('notificatxt')).getText()).to.eventually.equal("Usuario cadastrado com sucesso!");

      await element(by.id('cpf')).clear();
      await element(by.id('nome')).clear();
      await element(by.id('email')).clear();
      await element(by.id('senha')).clear();

    });

    Given('exista um usuário cadastrado com o E-MAIL {stringInDoubleQuotes}', {timeout: 100 * 1000}, async (email) => {

      await element(by.id('cpf')).sendKeys('324.645.123-87');
      await element(by.id('nome')).sendKeys('Rafaela');
      await element(by.id('email')).sendKeys(email);
      await element(by.id('senha')).sendKeys('138138w1');

      await element(by.id('botao_cadastro')).click();

      await expect(element(by.id('notificatxt')).getText()).to.eventually.equal("Usuario cadastrado com sucesso!");

      await element(by.id('cpf')).clear();
      await element(by.id('nome')).clear();
      await element(by.id('email')).clear();
      await element(by.id('senha')).clear();

    });

    Given('existe um usuário cadastrado com E-MAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes}', {timeout: 100 * 1000}, async (email, senha) => {

      await $("a[name='cadastrar']").click();
      await element(by.id('cpf')).sendKeys('133.345.756-46');
      await element(by.id('nome')).sendKeys('Jefferson');
      await element(by.id('email')).sendKeys(email);
      await element(by.id('senha')).sendKeys(senha);

      await element(by.id('botao_cadastro')).click();

      await expect(element(by.id('notificatxt')).getText()).to.eventually.equal("Usuario cadastrado com sucesso!");

      await element(by.id('cpf')).clear();
      await element(by.id('nome')).clear();
      await element(by.id('email')).clear();
      await element(by.id('senha')).clear();
      await $("a[name='login']").click();

    });

    When('o usuário preenche o CPF {stringInDoubleQuotes}, o NOME {stringInDoubleQuotes}, o E-MAIL {stringInDoubleQuotes} e a SENHA {stringInDoubleQuotes}', {timeout: 100 * 1000}, async (cpf, nome, email, senha) => {
      await element(by.id('cpf')).sendKeys(cpf);
      await element(by.id('nome')).sendKeys(nome);
      await element(by.id('email')).sendKeys(email);
      await element(by.id('senha')).sendKeys(senha);
    });

    When('o usuário preenche NOME {stringInDoubleQuotes}, o E-MAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes}', {timeout: 100 * 1000}, async (nome, email, senha) => {
      await element(by.id('cpf')).sendKeys('');
      await element(by.id('nome')).sendKeys(nome);
      await element(by.id('email')).sendKeys(email);
      await element(by.id('senha')).sendKeys(senha);
    });
  
    When('o usuário preenche CPF {stringInDoubleQuotes}, NOME {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes}', {timeout: 100 * 1000}, async (cpf, nome, senha) => {
      await element(by.id('cpf')).sendKeys(cpf);
      await element(by.id('nome')).sendKeys(nome);
      await element(by.id('email')).sendKeys('');
      await element(by.id('senha')).sendKeys(senha);
    });

    When('o usuário preencher E-MAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes}', {timeout: 100 * 1000}, async (email, senha) => {
      await element(by.id('email')).sendKeys(email);
      await element(by.id('senha')).sendKeys(senha);
    });

    When(/^solicita a realização do cadastro$/, {timeout: 100 * 1000}, async () => {
      await element(by.id('botao_cadastro')).click();
    });

    When(/^solicia a realização do login$/, {timeout: 100 * 1000}, async () => {
      await element(by.id('botao_login')).click();
    });

    Then(/^aparece uma mensagem de confirmação do cadastro na tela$/, {timeout: 100 * 1000}, async () => {
      await expect(element(by.id('notificatxt')).getText()).to.eventually.equal("Usuario cadastrado com sucesso!");
    });

    Then('aparece uma mensagem de erro na tela, informando que o cadastro não foi concluído e que já existe um usuário com esse {stringInDoubleQuotes}', {timeout: 100 * 1000}, async (elemento) => {
      await expect(element(by.id('notificatxt')).getText()).to.eventually.equal("Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!");
    });

    Then('aparece uma mensagem de erro na tela, informando que o cadastro não foi concluído pois o campo {stringInDoubleQuotes} não foi preenchido', {timeout: 100 * 1000}, async (elemento) => {
      await expect(element(by.id('notificatxt')).getText()).to.eventually.equal("Alguma das entradas esta nula!");
    });

    Then('o login é concluído com sucesso e é iniciada uma sessão para o usuário de E-MAIL {stringInDoubleQuotes}', {timeout: 100 * 1000}, async (usuario) => {
      await expect(element(by.id('titulo')).getText()).to.eventually.equal("MINHA CONTA");
    });

    Then(/^o login não é concluído e aparece uma mensagem informando que alguma informação está incorreta$/, {timeout: 100 * 1000}, async () => {
      await expect(element(by.id('notificatxt')).getText()).to.eventually.equal("E-mail ou senha incorretos!");
    });

});