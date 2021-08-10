"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = exports.servidor = void 0;
const express = require("express");
const aluno_1 = require("../common/aluno");
const professor_1 = require("../common/professor");
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
let usuario_sessao = null;
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
    }
});
servidor.get('/meu_usuario', (req, res) => {
    res.send((usuario_sessao));
    console.log("No servidor:", usuario_sessao);
});
var server = servidor.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
function closeServer() {
    server.close();
}
exports.closeServer = closeServer;
//# sourceMappingURL=server.js.map