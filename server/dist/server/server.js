"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = exports.servidor = void 0;
const express = require("express");
const aluno_1 = require("../common/aluno");
const professor_1 = require("../common/professor");
const duvida_1 = require("../common/duvida");
const thread_1 = require("../common/thread");
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
servidor.use(express.static('../gui'));
servidor.set('view engine', 'pug');
let usuarios = [];
let usuario_sessao = null;
const duvida1 = new duvida_1.Duvida("duvida1", true, "Requisitos", "Como que faço isso?");
const duvida2 = new duvida_1.Duvida("duvida2", true, "Teste", "Como que faço aquilo?");
const duvida3 = new duvida_1.Duvida("duvida3", false, "Requisitos", "Como que faço aquilo lá?");
const thread1 = new thread_1.Thread("A partir de conversas com os stackholders", 0);
const thread2 = new thread_1.Thread("Entendendo as necessidades deles", 1);
const thread3 = new thread_1.Thread("Extraindo e observando as necessidades", 2);
let duvidas;
duvidas = [duvida1, duvida2, duvida3];
let threads;
threads = [thread1, thread2, thread3];
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
servidor.get('/duvidas', (req, res) => {
    res.send(JSON.stringify(Array.from(duvidas)));
});
servidor.get('/threads', (req, res) => {
    res.send(JSON.stringify(Array.from(threads)));
});
servidor.post('/publicar', (req, res) => {
    let titulo = req.body.titulo;
    let status = req.body.status;
    let assunto = req.body.assunto;
    let descricao = req.body.descricao;
    let duvida;
    duvida = new duvida_1.Duvida(titulo, status, assunto, descricao);
    let nulo = false;
    if (titulo === '' || status === '' || assunto === '' || descricao === '') {
        nulo = true;
    }
    if (nulo) {
        res.send({
            failure: 'Alguma das entradas esta nula!',
        });
    }
    else {
        let existe = false;
        for (let i of duvidas) {
            if (i.titulo == duvida.titulo) {
                existe = true;
            }
        }
        if (existe) {
            res.send({
                failure: 'Uma duvida com esse TITULO ja existe na base de dados!',
            });
        }
        else {
            //console.log(usuarios);
            duvidas.push(duvida);
            console.log(usuarios);
            res.send({
                success: 'Duvida cadastrada com sucesso!',
            });
        }
        console.log(duvidas);
    }
});
servidor.post('/responder', (req, res) => {
    let discursao = req.body.discursao;
    let id = req.body.id;
    let thread;
    thread = new thread_1.Thread(discursao, id);
    let nulo = false;
    if (discursao === '' || id === '') {
        nulo = true;
    }
    if (nulo) {
        res.send({
            failure: 'Alguma das entradas esta nula!',
        });
    }
    else {
        threads.push(thread);
        console.log(threads);
        res.send({
            success: 'Resposta cadastrada com sucesso!',
        });
        console.log(threads);
    }
});
var server = servidor.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
function closeServer() {
    server.close();
}
exports.closeServer = closeServer;
//# sourceMappingURL=server.js.map