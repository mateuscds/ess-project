import request = require("request-promise");

const fs = require('fs');
let path = require('path');

import { Usuario } from '../../common/usuario';
import { Professor } from '../../common/professor';
import { Aluno } from '../../common/aluno';
import { Notificador } from '../../common/notificador';
import { Notificacao } from "../../common/notificacao";

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
    var server: any;
  
    beforeAll(() => { server = require('../server') });
  
    afterAll(() => { server.closeServer() });

    it("notificador de aluno recém cadastrado é criado", () => {    
        let aluno = new Aluno('111.222.333-44', 'lucas', 'lucas@ufpe.br', '123');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': aluno});

        return request.get(base_url + "notificador").then(
            body => {
            body = JSON.parse(body);
                let existe = false;
                console.log(body);
                for (let n of body){
                    let notificador_aux = new Notificador('');
                    Object.assign(notificador_aux, n);
                    console.log(notificador_aux.Cpf_user);
                    if(notificador_aux.Cpf_user == aluno.Cpf){
                        existe = true;
                        break;
                    }
                }
                expect(existe).toEqual(true);    
            }
        ).catch(e =>
            expect(e).toEqual(null)
        );

    })

    it("notificador de professor recém cadastrado é criado", () => {    
        let prof = new Professor('111.222.333-44', 'lucas', 'lucas@ufpe.br', '123');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': prof});

        return request.get(base_url + "notificador").then(
            body => {
            body = JSON.parse(body);
                let existe = false;
                console.log(body);
                for (let n of body){
                    let notificador_aux = new Notificador('');
                    Object.assign(notificador_aux, n);
                    console.log(notificador_aux.Cpf_user);
                    if(notificador_aux.Cpf_user == prof.Cpf){
                        existe = true;
                        break;
                    }
                }
                expect(existe).toEqual(true);    
            }
        ).catch(e =>
            expect(e).toEqual(null)
        );

    })



    it("limpar notificador de professor", () => {    
        let prof = new Professor('111.222.333-44', 'lucas', 'lucas@ufpe.br', '123');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': prof});

        request.post({'url': base_url + 'set_notificador', 'form': {'cpf': prof.Cpf, 'msg': "Teste", 'tipo': "att"}});

        request.post({'url': base_url + 'login', 'form': {'email': prof.Email, 'senha': prof.Senha}});

        request.get({'url': base_url + 'limpar'});

        return request.get(base_url + "notificador").then(
            body => {
            body = JSON.parse(body);
                let flag = false;
                for (let n of body){
                    let notificador_aux = new Notificador('');
                    Object.assign(notificador_aux, n);
                    if(notificador_aux.Cpf_user == prof.Cpf){
                        if(notificador_aux.notificacoes.length == 0){
                            flag = true;
                            break;
                        }
                    }
                }
                expect(flag).toEqual(true);    
            }
        ).catch(e =>
            expect(e).toEqual(null)
        );

    })

    it("limpar notificador de aluno", () => {    
        let aluno = new Aluno('111.222.333-44', 'lucas', 'lucas@ufpe.br', '123');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': aluno});

        request.post({'url': base_url + 'set_notificador', 'form': {'cpf': aluno.Cpf, 'msg': "Teste", 'tipo': "att"}});

        request.post({'url': base_url + 'login', 'form': {'email': aluno.Email, 'senha': aluno.Senha}});

        request.get({'url': base_url + 'limpar'});

        return request.get(base_url + "notificador").then(
            body => {
            body = JSON.parse(body);
                let flag = false;
                for (let n of body){
                    let notificador_aux = new Notificador('');
                    Object.assign(notificador_aux, n);
                    if(notificador_aux.Cpf_user == aluno.Cpf){
                        if(notificador_aux.notificacoes.length == 0){
                            flag = true;
                            break;
                        }
                    }
                }
                expect(flag).toEqual(true);    
            }
        ).catch(e =>
            expect(e).toEqual(null)
        );

    })


})
