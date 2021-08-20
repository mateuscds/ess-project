const { BeforeAll, After, AfterAll, Status } = require("cucumber");
//import { defineSupportCode } from '@cucumber/cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let path = require('path');

async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

var {defineSupportCode} = require('cucumber');
console.log("TIPO", typeof defineSupportCode);
defineSupportCode(function ({ Given, When, Then }) {
    
    Given(/^que o usuário esteja na página de cadastro do sistema$/, {timeout: 100 * 1000}, async () => {
        await browser.get("http://localhost:4200/");
        //await expect(browser.getTitle()).to.eventually.equal('Gui');
        //await $("a[name='cadastrar']").click();
    });

    /*Given(/^seja selecionada a opção de cadastro de aluno$/, {timeout: 100 * 1000}, async () => {
        var radio = $("input[type='radio']");
        radio.get(1).click();
        expect(radio.getAttribute('value')).toEqual('Aluno');
    })*/
});