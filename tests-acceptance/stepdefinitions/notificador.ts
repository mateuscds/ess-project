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
  
  
  Given("que o usuario de CPF {stringInDoubleQuotes}, NOME {stringInDoubleQuotes}, EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} está logado no sistema", {timeout: 200 * 1000}, async (cpf, nome, email, senha) => {
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


  Given("que o aluno de CPF {stringInDoubleQuotes}, NOME {stringInDoubleQuotes}, EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} está logado no sistema", {timeout: 200 * 1000}, async (cpf, nome, email, senha) => {
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



  Given("que o professor de CPF {stringInDoubleQuotes}, NOME {stringInDoubleQuotes}, EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} está logado no sistema", {timeout: 200 * 1000}, async (cpf, nome, email, senha) => {
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


  Given("que o aluno de CPF {stringInDoubleQuotes}, NOME {stringInDoubleQuotes}, EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} está cadastrado no sistema", {timeout: 200 * 1000}, async (cpf, nome, email, senha) => {

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



  Given("o aluno de EMAIL {stringInDoubleQuotes} foi convidado para uma turma de NOME {stringInDoubleQuotes}, CÓDIGO {stringInDoubleQuotes} e SEMESTRE {stringInDoubleQuotes} de pelo professor de CPF {stringInDoubleQuotes}, NOME {stringInDoubleQuotes}, EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes}", {timeout: 200 * 1000}, async (email_aluno, nome_turma, codigo, semestre, cpf_prof, nome_prof, email_prof, senha_prof) => {

    await $("a[name='cadastrar']").click();

    await element(by.id('cpf')).clear();
    await element(by.id('nome')).clear();
    await element(by.id('email')).clear();
    await element(by.id('senha')).clear();

    await element(by.id('cpf')).sendKeys(cpf_prof);
    await element(by.id('nome')).sendKeys(nome_prof);
    await element(by.id('email')).sendKeys(email_prof);
    await element(by.id('senha')).sendKeys(senha_prof);

    await element(by.id('prof_monitor')).click();
    await element(by.id('botao_cadastro')).click();

    await $("a[name='login']").click();

    await element(by.id('email')).sendKeys(email_prof);
    await element(by.id('senha')).sendKeys(senha_prof);

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


  
  When("o aluno de EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} loga no sistema", {timeout: 200 * 1000}, async (email, senha) => {

    await $("a[name='login']").click();
    await element(by.id('email')).sendKeys(email);
    await element(by.id('senha')).sendKeys(senha);

    await element(by.id('botao_login')).click();

  });


  When("o professor de EMAIL {stringInDoubleQuotes} e SENHA {stringInDoubleQuotes} loga no sistema", {timeout: 200 * 1000}, async (email, senha) => {

    await $("a[name='login']").click();
    await element(by.id('email')).sendKeys(email);
    await element(by.id('senha')).sendKeys(senha);

    await element(by.id('botao_login')).click();

  });


  When("atualiza as notificações", {timeout: 200 * 1000}, async () => {
    await $("button[name='atualizarBotao']").click();
  });


  When("aluno de CPF {stringInDoubleQuotes} clica na notificação do convite para a turma de NOME {stringInDoubleQuotes} e CÓDIGO {stringInDoubleQuotes} pelo professor de NOME {stringInDoubleQuotes}", {timeout: 200 * 1000}, async (cpf_aluno, nome_turma, codigo_turma, nome_prof) => {
    await element(by.id(codigo_turma)).click();
  });

  When("professor de CPF {stringInDoubleQuotes} clica na notificação de atualização de convite para a turma de NOME {stringInDoubleQuotes} e CÓDIGO {stringInDoubleQuotes} para o aluno de CPF {stringInDoubleQuotes}", {timeout: 200 * 1000}, async (cpf_prof, nome_turma, codigo_turma, cpf_aluno) => {
    await element(by.id(codigo_turma+"_"+cpf_aluno)).click();
  });


  When("vai para página de minhas turmas", {timeout: 200 * 1000}, async () => {
    await $("a[name='minhas_turmas']").click();
  });


  When("clica em aceitar o convite para a turma de NOME {stringInDoubleQuotes} e CÓDIGO {stringInDoubleQuotes}", {timeout: 200 * 1000}, async (nome, codigo) => {

    var str1 = new String("botao_aceitar_");
    var str2 = str1.concat(codigo.toString());

    await element(by.id(str2)).click();
  });



  Then("uma notificação do convite de turma de NOME {stringInDoubleQuotes} e CÓDIGO {stringInDoubleQuotes} pelo professor de NOME {stringInDoubleQuotes}", {timeout: 200 * 1000}, async (nome_turma, codigo_turma, nome_prof) => {
    await expect(element(by.id(codigo_turma)).getText()).to.eventually.equal("Você foi convidado por "+ nome_prof +" para participar da turma " + nome_turma + ".");
  }); 


  Then("uma notificação do atualização de convite pendente da turma de NOME {stringInDoubleQuotes} e CÓDIGO {stringInDoubleQuotes} para o aluno de NOME {stringInDoubleQuotes} e CPF {stringInDoubleQuotes}", {timeout: 200 * 1000}, async (nome_turma, codigo_turma, nome_aluno, cpf_aluno) => {
    await expect(element(by.id(codigo_turma+"_"+cpf_aluno)).getText()).to.eventually.equal("Seu convite para " +  nome_aluno + " está pendente!");
  }); 


  Then("aparece uma lista de notificações referentes a ao usuário de NOME {stringInDoubleQuotes}", {timeout: 200 * 1000}, async (nome) => {
    await expect(element(by.id('notifLogado')).getText()).to.eventually.equal("Notificações - " + nome);
  });


  Then("está na página da turma de NOME {stringInDoubleQuotes} e CÓDIGO {stringInDoubleQuotes}", {timeout: 200 * 1000}, async (nome, código) => {
    await expect(element(by.id('nomeTurmaID')).getText()).to.eventually.equal(nome);
  });

  Then("está na página de minhas turmas", {timeout: 200 * 1000}, async () => {
    await expect(element(by.id('minhasTurmasID')).getText()).to.eventually.equal("MINHAS TURMAS");
  });



  Then("notificação de convite para a turma de NOME {stringInDoubleQuotes} e CÓDIGO {stringInDoubleQuotes} para o aluno de NOME {stringInDoubleQuotes} e CPF {stringInDoubleQuotes} é removida", {timeout: 300 * 1000}, async (nome_turma, codigo_turma, nome_aluno, cpf_aluno) => {

    let flag = false;

    await expect(element(by.id(codigo_turma+"_"+cpf_aluno)).isDisplayed().then(function(visible) {
      if (visible) {
        flag = true;
      } else {
        flag = false;
      }
    }));

    await expect(flag).to.equal(false);
  });
});