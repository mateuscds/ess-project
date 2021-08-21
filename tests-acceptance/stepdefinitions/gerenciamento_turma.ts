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

  Given("que o professor de CPF {stringInDoubleQuotes}, NOME {stringInDoubleQuotes}, EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} está logado no sistema", {timeout: 100 * 1000}, async (cpf, nome, email, senha) => {
    await browser.get("http://localhost:4200/");
    await expect(browser.getTitle()).to.eventually.equal('Gui');
    await $("a[name='cadastrar']").click();

    await element(by.id('cpf')).sendKeys(cpf);
    await element(by.id('nome')).sendKeys(nome);
    await element(by.id('email')).sendKeys(email);
    await element(by.id('senha')).sendKeys(senha);

    await element(by.id('botao_cadastro')).click();

    await $("a[name='login']").click();

    await element(by.id('email')).sendKeys(email);
    await element(by.id('senha')).sendKeys(senha);

    await element(by.id('botao_login')).click();
  });

  Given("que o aluno de CPF {stringInDoubleQuotes}, NOME {stringInDoubleQuotes}, EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} está cadastrado no sistema", {timeout: 100 * 1000}, async (cpf, nome, email, senha) => {

    await browser.get("http://localhost:4200/");
    await expect(browser.getTitle()).to.eventually.equal('Gui');
    await $("a[name='cadastrar']").click();

    await element(by.id('cpf')).sendKeys(cpf);
    await element(by.id('nome')).sendKeys(nome);
    await element(by.id('email')).sendKeys(email);
    await element(by.id('senha')).sendKeys(senha);

    await element(by.id('aluno')).click();
    await element(by.id('botao_cadastro')).click();
  });

  Given(/^esta na página de criação de turma$/, {timeout: 100 * 1000}, async () => {
    await $("a[name='criar_turma']").click();
  });

  Given("existe a turma de NOME {stringInDoubleQuotes}, CODIGO {stringInDoubleQuotes} e SEMESTRE {stringInDoubleQuotes}", {timeout: 100 * 1000}, async (nome, codigo, semestre) => {

    await $("a[name='criar_turma']").click();

    await element(by.id('nome')).sendKeys(nome);
    await element(by.id('codigo')).sendKeys(codigo);
    await element(by.id('semestre')).sendKeys(semestre); 

    await element(by.id('botao_criar_turma')).click();
  });

  Given("o professor esta na página de gerenciamento dessa turma de código {stringInDoubleQuotes}", {timeout: 100 * 1000}, async (codigo) => {

    await $("a[name='minhas_turmas']").click();

    var str1 = new String("a[name='");
    var str2 = new String("']");
    var str3 = str1.concat(codigo.toString()).concat(str2.toString());

    await $(str3).click();
  });

  Given("que o professor de CPF {stringInDoubleQuotes}, NOME {stringInDoubleQuotes}, EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} responsável pela turma de NOME {stringInDoubleQuotes}, CODIGO {stringInDoubleQuotes} e SEMESTRE {stringInDoubleQuotes} tenha enviado um convite para o aluno de EMAIL {stringInDoubleQuotes}", {timeout: 100 * 1000}, async (cpf, nome_prof, email_prof, senha, nome_turma, codigo, semestre, email_aluno) => {

    await element(by.id('cpf')).clear();
    await element(by.id('nome')).clear();
    await element(by.id('email')).clear();
    await element(by.id('senha')).clear();

    await element(by.id('cpf')).sendKeys(cpf);
    await element(by.id('nome')).sendKeys(nome_prof);
    await element(by.id('email')).sendKeys(email_prof);
    await element(by.id('senha')).sendKeys(senha);

    await element(by.id('prof_monitor')).click();
    await element(by.id('botao_cadastro')).click();

    await $("a[name='login']").click();

    await element(by.id('email')).sendKeys(email_prof);
    await element(by.id('senha')).sendKeys(senha);

    await element(by.id('botao_login')).click();

    await $("a[name='criar_turma']").click();

    await element(by.id('nome')).sendKeys(nome_turma);
    await element(by.id('codigo')).sendKeys(codigo);
    await element(by.id('semestre')).sendKeys(semestre); 

    await element(by.id('botao_criar_turma')).click();
    await expect(element(by.id('notificatxt')).getText()).to.eventually.equal("Turma cadastrada com sucesso!");

    await $("a[name='minhas_turmas']").click();

    var str1 = new String("a[name='");
    var str2 = new String("']");
    var str3 = str1.concat(codigo.toString()).concat(str2.toString());

    await $(str3).click();

    await element(by.id('email_aluno')).sendKeys(email_aluno);
    await element(by.id('convida_aluno')).click();
  });

  Given("o aluno de EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} esteja logado no sistema", {timeout: 100 * 1000}, async (email, senha) => {

    await $("a[name='login']").click();

    await element(by.id('email')).sendKeys(email);
    await element(by.id('senha')).sendKeys(senha);

    await element(by.id('botao_login')).click();
  });

  Given(/^o aluno esteja na página de minhas turmas$/, {timeout: 100 * 1000}, async () => {
    await $("a[name='minhas_turmas']").click();
  });

  When("ele preenche as informações de nome, código e semestre da turma com {stringInDoubleQuotes},  {stringInDoubleQuotes} e {stringInDoubleQuotes}, respectivamente.", {timeout: 100 * 1000}, async (nome, codigo, semestre) => {

    await element(by.id('nome')).sendKeys(nome);
    await element(by.id('codigo')).sendKeys(codigo);
    await element(by.id('semestre')).sendKeys(semestre); 
  });

  When(/^solicita cadastrar a turma$/, {timeout: 100 * 1000}, async () => {
    await element(by.id('botao_criar_turma')).click();
  });

  When("ele preenche as informações de código e semestre da turma com {stringInDoubleQuotes} e {stringInDoubleQuotes}, respectivamente.", {timeout: 100 * 1000}, async (codigo, semestre) => {

    await element(by.id('nome')).sendKeys('');
    await element(by.id('codigo')).sendKeys(codigo);
    await element(by.id('semestre')).sendKeys(semestre); 
  });

  When("quando ele preencher o aluno de EMAIL {stringInDoubleQuotes}", {timeout: 100 * 1000}, async (email) => {
    await element(by.id('email_aluno')).sendKeys(email);
  });

  When(/^solicitar que o convite seja enviado$/, {timeout: 100 * 1000}, async () => {
    await element(by.id('convida_aluno')).click();
  });

  When("quando o aluno solicitar aceitar o convite enviado referente à turma de código {stringInDoubleQuotes}", {timeout: 100 * 1000}, async (codigo) => {

    var str1 = new String("botao_aceitar_");
    var str2 = str1.concat(codigo.toString());

    await element(by.id(str2)).click();
  });

  Then(/^ele consegue visualizar uma mensagem avisando que o cadastro da turma foi feito com sucesso.$/, {timeout: 100 * 1000}, async () => {
    await expect(element(by.id('notificatxt')).getText()).to.eventually.equal("Turma cadastrada com sucesso!");
  });

  Then(/^ele consegue visualizar uma mensagem avisando que o cadastro não pode ser realizado$/, {timeout: 100 * 1000}, async () => {
    await expect(element(by.id('notificatxt')).getText()).to.eventually.equal("Nome, codigo ou semestre nulos!");
  });

  Then(/^ele consegue visualizar uma mensagem informando que o convite foi enviado com sucesso$/, {timeout: 100 * 1000}, async () => {
    await expect(element(by.id('notificatxt')).getText()).to.eventually.equal("Usuario convidado com sucesso!");
  });

  Then(/^ele consegue visualizar uma mensagem informando que o convite não foi enviado com sucesso$/, {timeout: 100 * 1000}, async () => {
    await expect(element(by.id('notificatxt')).getText()).to.eventually.equal("O email do convite não pode ser vazio!");
  });

  Then("ele consegue visualizar que as opções de aceitar e rejeitar o convite da turma de código {stringInDoubleQuotes} desaparecem da tela.", {timeout: 100 * 1000}, async (codigo) => {

    var str1 = new String("botao_aceitar_");
    var str2 = str1.concat(codigo.toString());
    var flag1 = false, flag2 = false;

    await expect(element(by.id(str2)).isDisplayed().then(function(visible) {
      if (visible) {
        flag1 = true;
      } else {
        flag1 = false;
      }
    }));

    var str3 = new String("botao_rejeitar_");
    var str4 = str3.concat(codigo.toString());

    await expect(element(by.id(str4)).isDisplayed().then(function(visible) {
      if (visible) {
        flag2 = true;
      } else {
        flag2 = false;
      }
    }));

    await expect(flag1 || flag2).to.equal(false);
  });
});