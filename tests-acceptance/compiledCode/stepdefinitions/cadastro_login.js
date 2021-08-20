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
//import { defineSupportCode } from '@cucumber/cucumber';
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
console.log("TIPO", typeof defineSupportCode);
defineSupportCode(function ({ Given, When, Then }) {
    Given(/^que o usuário esteja na página de cadastro do sistema$/, { timeout: 100 * 1000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        //await expect(browser.getTitle()).to.eventually.equal('Gui');
        //await $("a[name='cadastrar']").click();
    }));
    /*Given(/^seja selecionada a opção de cadastro de aluno$/, {timeout: 100 * 1000}, async () => {
        var radio = $("input[type='radio']");
        radio.get(1).click();
        expect(radio.getAttribute('value')).toEqual('Aluno');
    })*/
});
