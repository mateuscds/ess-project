import request = require("request-promise");

const fs = require('fs');
let path = require('path');

import { Usuario } from '../../common/usuario';
import { Professor } from '../../common/professor';
import { Aluno } from '../../common/aluno';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
    var server: any;
  
    beforeAll(() => { server = require('../server') });
  
    afterAll(() => { server.closeServer() });

    it("inicialmente retorna uma lista de usuários vazia", () => {
        return request.get(base_url + "usuario").then(body => expect(body).toBe("[]")).catch(e => expect(e).toEqual(null));
    })

    it("não remove usuário sem estar logado", () => {
        return request.get(base_url + "usuario")
                .then(body =>{
                    let res = body;
                    return request.post(base_url + "deleta")
                        .then(body => {
                            body = JSON.parse(body);
                            expect(body).toEqual({"failure":"Nenhum usuario foi deletado do sistema!"});
                            return request.get(base_url + "usuario").then(body => {
                                expect(body).toEqual(res);
                            }).catch(e =>
                                expect(e).toEqual(null)
                            );
                        }).catch(e =>
                            expect(e).toEqual(null)
                        );
                }).catch(e =>
                  expect(e).toEqual(null)
                );
      })

    it("cadastro bem sucedido de aluno", () => {
        let aluno_test = new Aluno('111.222.333-44', 'João', 'joao@ufpe.br', '1234');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': aluno_test});
        return request.get(base_url + "usuario").then(body => {
            body = JSON.parse(body);
            let existe = false;
            for (let a of body){
                let aluno_auxiliar = new Aluno('', '', '', '');
                Object.assign(aluno_auxiliar, a);
                if(aluno_auxiliar.Cpf == aluno_test.Cpf && aluno_auxiliar.hasOwnProperty('mascara')){
                    existe = true;
                    break;
                }
            }
            expect(existe).toEqual(true);    
        }).catch(e =>
            expect(e).toEqual(null)
        );
    })

    it("cadastro bem sucedido de professor", () => {
        let professor_test = new Professor('155.266.377-44', 'Júlia', 'julia@ufpe.br', '1615');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': professor_test});
        return request.get(base_url + "usuario").then(body => {
            body = JSON.parse(body);
            let existe = false;
            for (let a of body){
                let professor_auxiliar = new Professor('', '', '', '');
                Object.assign(professor_auxiliar, a);
                if(professor_auxiliar.Cpf == professor_test.Cpf && !(professor_auxiliar.hasOwnProperty('mascara'))){
                    existe = true;
                    break;
                }
            }
            expect(existe).toEqual(true);    
        }).catch(e =>
            expect(e).toEqual(null)
        );
    })

    it("cadastro mal sucedido com CPF já cadastrado", () => {
        let usuario_test = new Professor('999.888.777-66', 'Maria', 'maria@ufpe.br', '1111');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': usuario_test});
        return request.get(base_url + "usuario").then(body => {
            let res = body;
            let novo_usuario_test = new Professor('999.888.777-66', 'Gabriel', 'gabriel@ufpe.br', '9876');
            return request.post({'url': base_url + 'usuarios/cadastrar', 'form': novo_usuario_test}).then(body => {
                body = JSON.parse(body);
                expect(body).toEqual({"failure":"Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!"});
                return request.get(base_url + "usuario").then(body => {
                    expect(body).toEqual(res);
                }).catch(e =>
                    expect(e).toEqual(null)
                );
            }).catch(e =>
                expect(e).toEqual(null)
            );
        }).catch(e =>
            expect(e).toEqual(null)
        );
    })

    it("cadastro mal sucedido com EMAIL já cadastrado", () => {
        let usuario_test = new Aluno('936.327.123-21', 'Rafaela', 'rafael@ufpe.br', '2222');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': usuario_test});
        return request.get(base_url + "usuario").then(body => {
            let res = body;
            let novo_usuario_test = new Aluno('555.777.888-99', 'Rafael', 'rafael@ufpe.br', '1212');
            return request.post({'url': base_url + 'usuarios/cadastrar', 'form': novo_usuario_test}).then(body => {
                body = JSON.parse(body);
                expect(body).toEqual({"failure":"Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!"});
                return request.get(base_url + "usuario").then(body => {
                    //console.log('RES:', res);
                    //console.log('BODY:', body);
                    expect(body).toEqual(res);
                }).catch(e =>
                    expect(e).toEqual(null)
                );
            }).catch(e =>
                expect(e).toEqual(null)
            );
        }).catch(e =>
            expect(e).toEqual(null)
        );
    })

    it("cadastro mal sucedido por falta de CPF", () => {
        let usuario_test = new Aluno('', 'Maria', 'maria@ufpe.br', '4545');
        return request.get(base_url + "usuario").then(body => {
            let res = body;
            return request.post({'url': base_url + 'usuarios/cadastrar', 'form': usuario_test}).then(body => {
                body = JSON.parse(body);
                expect(body).toEqual({"failure":"Alguma das entradas esta nula!"});
                return request.get(base_url + "usuario").then(body => {
                    expect(body).toEqual(res);
                }).catch(e =>
                    expect(e).toEqual(null)
                );
            }).catch(e =>
                expect(e).toEqual(null)
            );
        }).catch(e =>
            expect(e).toEqual(null)
        );
    })

    // Testes da feature: Buscar Duvidas

    it("Eu tenho salvo no sistema a dúvida 'O que são stakeholders?'", () => {
        return request.get(base_url + "duvidas").then(body => {
            body = JSON.parse(body)
            let res = false
            for (let elm of body) {
                if (elm['titulo'] === 'O que são stakeholders?')
                    res = true
            }
            expect(res).toBe(true)
        });
    })

    it("Eu tenho salvo no sistema a dúvida 'Qual diferença entre requisitos funcionais e não funcionais?'", () => {
        return request.get(base_url + "duvidas").then(body => {
            body = JSON.parse(body)
            let res = false
            for (let elm of body) {
                console.log(elm)
                if (elm['titulo'] === 'Qual diferença entre requisitos funcionais e não funcionais?')
                    res = true
            }
            expect(res).toBe(true)
        });
    })

    it("Eu realizo uma busca por 'O que são stakeholders?'", () => {
        return request.get(base_url + "duvidas").then(body => {
            body = JSON.parse(body)
            let res = false
            for (let elm of body) {
                if (elm['titulo'] === 'O que são stakeholders?')
                    res = true
            }
            expect(res).toBe(true)
        })
    })
})