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

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {

  Given(/^Eu estou na página "Buscar Duvida"$/,{timeout: 100 * 1000}, async () => {
    await browser.get("http://localhost:4200/");
    await expect(browser.getTitle()).to.eventually.equal('Gui');
    await $("a[name='buscar_duvida']").click();
  })
  
  Given(/^Tenho uma dúvida com título "([^\"]*)" com estado "([^\"]*)"$/,{timeout: 100 * 1000}, async (titulo, estado) => {
      var allduvidas: ElementArrayFinder = $$("tbody[class='corpo-duvidas'] > tr")
      await allduvidas
      var titulo_status = allduvidas.filter(row => {
        return pAND(row.$$("td").get(0).getText().then(curTitulo =>{
                    return curTitulo === titulo
                  }),
                    row.$$("td").get(1).getText().then(curStatus =>{
                      return curStatus === estado
                  }))
      })
      await titulo_status
      await titulo_status.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1))
  })

  When(/^Eu insiro a busca por "([^\"]*)"$/, async (titulo) => {
    await $("input[name='searchBar']").sendKeys(<string> titulo);
    await $("button[name='buttonSearch']").click();
  });

  When(/^Seleciono a opção "([^\"]*)"$/, async (estado) => {
    var classe: string
    if (estado === "Concluídas e Não concluídas") classe = 'bothOpt'
    else if (estado === "Concluídas") classe = 'conclOpt'
    else if (estado === "Não Concluídas") classe = 'nConclOpt'

    await $(`input[class="${classe}"]`).click()
    await $("button[name='buttonSearch']").click();
  });

  When('Confirmo a busca', async () => {
    await $("button[name='buttonSearch']").click();
  });

  Then(/^Eu continuo na página "Buscar Duvida"$/, async () => {
    await expect(browser.getCurrentUrl()).to.eventually.equal('http://localhost:4200/buscar_duvida')
  })

  Then(/^Eu consigo ver somente a dúvida com título "([^\"]*)"$/, async (titulo) => {
    var allduvidas: ElementArrayFinder = $$("tbody[class='corpo-duvidas'] > tr")
    await allduvidas
    var titulos = allduvidas.filter(row => {
      return row.$$("td").get(0).getText().then(curTitulo =>{
                  return curTitulo === titulo
                })
    })
    await titulos
    await pAND(titulos.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)),
                allduvidas.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)))
  })

  Then(/^Eu consigo ver escrito "Nenhuma Dúvida Encontrada"$/, async () => {
    var label: ElementArrayFinder = $$("h3[name='nenhumaduvida']")
    await label
    await label.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1))
  })

  Then(/^Eu consigo ver a dúvida com título "([^\"]*)"$/, async (titulo) => {
    var allduvidas: ElementArrayFinder = $$("tbody[class='corpo-duvidas'] > tr")
    await allduvidas
    var titulos = allduvidas.filter(row => {
      return row.$$("td").get(0).getText().then(curTitulo =>{
                  return curTitulo === titulo
                })
    })
    await titulos
    await titulos.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1))
  })

  Then(/^Eu não consigo ver a dúvida com título "([^\"]*)"$/, async (titulo) => {
    var allduvidas: ElementArrayFinder = $$("tbody[class='corpo-duvidas'] > tr")
    await allduvidas
    var titulos = allduvidas.filter(row => {
      return row.$$("td").get(0).getText().then(curTitulo =>{
                  return curTitulo === titulo
                })
    })
    await titulos
    await titulos.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0))
  })
})