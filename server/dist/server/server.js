"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = exports.servidor = void 0;
const express = require("express");
const aluno_1 = require("../common/aluno");
const professor_1 = require("../common/professor");
const turma_1 = require("../common/turma");
var servidor = express();
exports.servidor = servidor;
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
servidor.use(allowCrossDomain);
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: true }));
let usuarios = [];
let turmas = [];
let usuario_sessao = null;
let turma_sessao = null;
servidor.post('/usuarios/cadastrar', (req, res) => {
    let cpf = req.body.cpf;
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    let usuario;
    if (req.body.hasOwnProperty('mascara')) {
        usuario = new aluno_1.Aluno(cpf, nome, email, senha);
    }
    else {
        usuario = new professor_1.Professor(cpf, nome, email, senha);
    }
    let nulo = false;
    if (cpf === '' || nome === '' || email === '' || senha === '') {
        nulo = true;
    }
    if (nulo) {
        res.send({
            failure: 'Alguma das entradas esta nula!',
        });
    }
    else {
        let existe = false;
        for (let i of usuarios) {
            if (i.Cpf == usuario.Cpf || i.Email == usuario.Email) {
                existe = true;
            }
        }
        if (existe) {
            res.send({
                failure: 'Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!',
            });
        }
        else {
            //console.log(usuarios);
            usuarios.push(usuario);
            //console.log(usuarios);
            res.send({
                success: 'Usuario cadastrado com sucesso!',
            });
        }
        console.log(usuarios);
    }
});
servidor.get('/usuario', (req, res) => {
    res.send(JSON.stringify(Array.from(usuarios)));
});
servidor.post('/login', (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;
    let nulo = false;
    if (email === '' || senha === '') {
        nulo = true;
    }
    if (nulo) {
        res.send({
            failure: 'E-mail ou senha nulos!',
        });
    }
    else {
        let existe = false;
        for (let i of usuarios) {
            if (i.Email == email && i.Senha == senha) {
                existe = true;
                usuario_sessao = i;
            }
        }
        if (existe) {
            res.send({
                success: 'Login realizado com sucesso!',
            });
        }
        else {
            res.send({
                failure: 'E-mail ou senha incorretos!',
            });
        }
    }
    console.log(usuario_sessao);
});
servidor.post('/atualiza_cadastro', (req, res) => {
    if (usuario_sessao != null) {
        let cpf = req.body.cpf;
        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;
        let usuario_modificado;
        if (usuario_sessao.hasOwnProperty('mascara')) {
            usuario_modificado = new aluno_1.Aluno(cpf, nome, email, senha);
        }
        else {
            usuario_modificado = new professor_1.Professor(cpf, nome, email, senha);
        }
        let nulo = false;
        if (cpf === '' || nome === '' || email === '' || senha === '') {
            nulo = true;
        }
        if (nulo) {
            res.send({
                failure: 'Alguma das entradas esta nula!',
            });
        }
        else {
            let index = 0;
            for (let i of usuarios) {
                if (i.Cpf == usuario_sessao.Cpf && i.Email == usuario_sessao.Email) {
                    break;
                }
                index += 1;
            }
            let existe = false;
            let index_aux = 0;
            for (let i of usuarios) {
                if ((i.Cpf == usuario_modificado.Cpf || i.Email == usuario_modificado.Email) && index_aux != index) {
                    existe = true;
                }
                index_aux += 1;
            }
            if (existe) {
                res.send({
                    failure: 'Um outro usuario com esse CPF ou esse EMAIL ja existe na base de dados!',
                });
            }
            else {
                usuarios[index] = usuario_modificado;
                usuario_sessao = usuario_modificado;
                res.send({
                    success: 'Atualizacao realizada com sucesso!',
                });
            }
            console.log(usuarios);
            console.log(usuario_sessao);
        }
    }
    else {
        res.send({
            failure: 'Voce nao esta logado no sistema para atualizar seus dados!',
        });
    }
});
servidor.get('/meu_usuario', (req, res) => {
    res.send((usuario_sessao));
});
servidor.post('/desloga', (req, res) => {
    usuario_sessao = null;
    res.send({
        success: 'Usuario deslogado do sistema com sucesso!',
    });
    console.log(usuario_sessao);
});
servidor.post('/deleta', (req, res) => {
    let usuario_atual;
    for (let i of usuarios) {
        if (i.Cpf == usuario_sessao.Cpf && i.Email == usuario_sessao.Email) {
            usuario_atual = i;
            break;
        }
    }
    usuarios = usuarios.filter(obj => obj !== usuario_atual);
    usuario_sessao = null;
    res.send({
        success: 'Usuario deletado do sistema com sucesso!',
    });
    console.log(usuarios);
    console.log(usuario_sessao);
});
servidor.post('/criar_turma', (req, res) => {
    let nome = req.body.nome;
    let codigo = req.body.codigo;
    let semestre = req.body.semestre;
    if (usuario_sessao == null) {
        res.send({
            failure: 'Você não está logado como professor no sistema!',
        });
    }
    else {
        if (usuario_sessao.hasOwnProperty('mascara')) {
            res.send({
                failure: 'Apenas professores podem realizar a criação de turmas!',
            });
        }
        else {
            let nulo = false;
            if (nome === '' || codigo === '' || semestre === '') {
                nulo = true;
            }
            if (nulo) {
                res.send({
                    failure: 'Nome, codigo ou semestre nulos!',
                });
            }
            else {
                let existe = false;
                for (let i of turmas) {
                    if (i.Codigo == codigo) {
                        existe = true;
                    }
                }
                if (existe) {
                    res.send({
                        failure: 'Já existe uma turma cadastrada com esse código!',
                    });
                }
                else {
                    let nova_turma = new turma_1.Turma(nome, codigo, semestre, usuario_sessao);
                    turmas.push(nova_turma);
                    console.log(usuarios);
                    res.send({
                        success: 'Turma cadastrada com sucesso!',
                    });
                }
            }
        }
        console.log(turmas);
    }
});
servidor.get('/minhas_turmas', (req, res) => {
    let turmas_aux = [];
    for (let i of turmas) {
        if (usuario_sessao.Cpf == i.Professor_responsavel.Cpf) {
            turmas_aux.push(i);
        }
    }
    res.send((turmas_aux));
});
servidor.get('/minha_turma', (req, res) => {
    res.send((turma_sessao));
});
servidor.post('/envia_turma', (req, res) => {
    let turma_aux = null;
    for (let i of turmas) {
        if (req.body.codigo == i.Codigo) {
            turma_aux = i;
            break;
        }
    }
    turma_sessao = turma_aux;
    res.send({
        success: 'Turma registrada com sucesso!',
    });
    console.log("Turma sessão: ", turma_sessao);
});
servidor.post('/atualiza_turma', (req, res) => {
    if (usuario_sessao != null) {
        let nome = req.body.nome;
        let codigo = req.body.codigo;
        let semestre = req.body.semestre;
        let turma_modificada = null;
        let nulo = false;
        if (nome === '' || codigo === '' || semestre === '') {
            nulo = true;
        }
        if (nulo) {
            res.send({
                failure: 'Alguma das entradas esta nula!',
            });
        }
        else {
            let index = 0;
            for (let i of turmas) {
                if (i.Codigo == turma_sessao.Codigo) {
                    break;
                }
                index += 1;
            }
            let existe = false;
            let index_aux = 0;
            turma_modificada = new turma_1.Turma(nome, codigo, semestre, usuario_sessao);
            for (let i of turmas) {
                if ((i.Codigo == turma_modificada.Codigo) && index_aux != index) {
                    existe = true;
                }
                index_aux += 1;
            }
            if (existe) {
                res.send({
                    failure: 'Uma outra turma com esse código ja existe na base de dados!',
                });
            }
            else {
                turmas[index] = turma_modificada;
                turma_sessao = turma_modificada;
                res.send({
                    success: 'Atualizacao realizada com sucesso!',
                });
            }
            console.log(turmas);
            console.log(turma_sessao);
        }
    }
});
servidor.post('/deleta_turma', (req, res) => {
    let turma_atual;
    for (let i of turmas) {
        if (i.Codigo == turma_sessao.Codigo) {
            turma_atual = i;
            break;
        }
    }
    turmas = turmas.filter(obj => obj !== turma_atual);
    turma_sessao = null;
    res.send({
        success: 'Turma deletada do sistema com sucesso!',
    });
    console.log(turmas);
    console.log(turma_sessao);
});
var server = servidor.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
function closeServer() {
    server.close();
}
exports.closeServer = closeServer;
//# sourceMappingURL=server.js.map