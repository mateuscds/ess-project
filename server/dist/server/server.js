"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = exports.servidor = void 0;
const express = require("express");
const aluno_1 = require("../common/aluno");
const professor_1 = require("../common/professor");
const turma_1 = require("../common/turma");
function ehAluno(objeto) {
    if (objeto.hasOwnProperty('mascara')) {
        return true;
    }
    else {
        return false;
    }
}
function existeUsuario(objeto) {
    let existe = false;
    for (let i of usuarios) {
        if (i.Cpf == objeto.Cpf || i.Email == objeto.Email) {
            existe = true;
        }
    }
    return existe;
}
function existeUsuarioCadastrado(email, senha) {
    let existe = false;
    let usuario_sessao_aux = null;
    for (let i of usuarios) {
        if (i.Email == email && i.Senha == senha) {
            existe = true;
            usuario_sessao_aux = i;
        }
    }
    return [existe, usuario_sessao_aux];
}
function encontraIndexUsuario() {
    let index = 0;
    for (let i of usuarios) {
        if (i.Cpf == usuario_sessao.Cpf && i.Email == usuario_sessao.Email) {
            break;
        }
        index += 1;
    }
    return index;
}
function existeUsuarioDiferente(objeto, index) {
    let existe = false;
    let index_aux = 0;
    for (let i of usuarios) {
        if ((i.Cpf == objeto.Cpf || i.Email == objeto.Email) && index_aux != index) {
            existe = true;
        }
        index_aux += 1;
    }
    return existe;
}
function deletaUsuario() {
    let usuario_atual;
    for (let i of usuarios) {
        if (i.Cpf == usuario_sessao.Cpf && i.Email == usuario_sessao.Email) {
            usuario_atual = i;
            break;
        }
    }
    usuarios = usuarios.filter(obj => obj !== usuario_atual);
}
function deletaUsuarioDasTurmas() {
    let objeto_auxiliar = null;
    let index = 0;
    if (ehAluno(usuario_sessao)) {
        for (let t of turmas) {
            let lista_de_alunos = t.Lista_de_alunos;
            for (let a of lista_de_alunos) {
                let student = a[0];
                if (student.Cpf == usuario_sessao.Cpf) {
                    objeto_auxiliar = a;
                    turmas[index].Lista_de_alunos = turmas[index].Lista_de_alunos.filter(obj => obj !== objeto_auxiliar);
                    console.log('Lista de alunos após deletar');
                    console.log(turmas[index].Lista_de_alunos);
                    break;
                }
            }
            index += 1;
        }
    }
}
function existeTurma(codigo) {
    let existe = false;
    for (let i of turmas) {
        if (i.Codigo == codigo) {
            existe = true;
        }
    }
    return existe;
}
function turmasAluno() {
    let turmas_aux = [];
    let status_list = [];
    for (let i of turmas) {
        let student_list = i.Lista_de_alunos;
        for (let j of student_list) {
            if (j[0].Cpf == usuario_sessao.Cpf) {
                turmas_aux.push(i);
                status_list.push(j[1]);
            }
        }
    }
    return [turmas_aux, status_list];
}
function turmasProfessor() {
    let turmas_aux = [];
    for (let i of turmas) {
        if (usuario_sessao.Cpf == i.Professor_responsavel.Cpf) {
            turmas_aux.push(i);
        }
    }
    return turmas_aux;
}
function retornaTurma(codigo) {
    let turma_aux = null;
    for (let i of turmas) {
        if (codigo == i.Codigo) {
            turma_aux = i;
            break;
        }
    }
    return turma_aux;
}
function retornaIndexTurma() {
    let index = 0;
    for (let i of turmas) {
        if (i.Codigo == turma_sessao.Codigo) {
            break;
        }
        index += 1;
    }
    return index;
}
function existeTurmaDiferente(turma_modificada, index) {
    let existe = false;
    let index_aux = 0;
    for (let i of turmas) {
        if ((i.Codigo == turma_modificada.Codigo) && index_aux != index) {
            existe = true;
        }
        index_aux += 1;
    }
    return existe;
}
function retornaAlunoConvidado(email) {
    let usuario_convidado = null;
    for (let i of usuarios) {
        if (i.Email == email) {
            usuario_convidado = i;
            break;
        }
    }
    return usuario_convidado;
}
function existeConvidado(list_convidados, email) {
    let exists = false;
    for (let i of list_convidados) {
        if (i[0].Email == email) {
            exists = true;
            break;
        }
    }
    return exists;
}
function procuraIndexAlunoConvidado(codigo) {
    let index_turmas = 0;
    let index_aluno = 0;
    for (let turma of turmas) {
        if (codigo == turma.Codigo) {
            for (let aluno of turma.Lista_de_alunos) {
                if (aluno[0].Cpf == usuario_sessao.Cpf) {
                    break;
                }
                index_aluno += 1;
            }
            break;
        }
        index_turmas += 1;
    }
    return [index_turmas, index_aluno];
}
function atualizaListaAlunos(index_turmas) {
    let lista_alunos_aux = [];
    for (let aluno of turmas[index_turmas].Lista_de_alunos) {
        if (aluno[0].Cpf != usuario_sessao.Cpf) {
            lista_alunos_aux.push(aluno);
        }
    }
    turmas[index_turmas].Lista_de_alunos = lista_alunos_aux;
}
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
    if (ehAluno(req.body)) {
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
        if (existeUsuario(usuario)) {
            res.send({
                failure: 'Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!',
            });
        }
        else {
            usuarios.push(usuario);
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
        let resposta = existeUsuarioCadastrado(email, senha);
        let existe = resposta[0];
        usuario_sessao = resposta[1];
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
        if (ehAluno(usuario_sessao)) {
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
            let index = encontraIndexUsuario();
            if (existeUsuarioDiferente(usuario_modificado, index)) {
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
    if (usuario_sessao != null) {
        deletaUsuario();
        //removendo aluno deletado das turmas que ele pertence
        deletaUsuarioDasTurmas();
        usuario_sessao = null;
        res.send({
            success: 'Usuario deletado do sistema com sucesso!',
        });
        console.log(usuarios);
        console.log(usuario_sessao);
    }
    else {
        res.send({
            failure: 'Nenhum usuario foi deletado do sistema!',
        });
    }
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
        if (ehAluno(usuario_sessao)) {
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
                if (existeTurma(codigo)) {
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
    let status_list = [];
    if (ehAluno(usuario_sessao)) {
        let res = turmasAluno();
        turmas_aux = res[0];
        status_list = res[1];
    }
    else {
        turmas_aux = turmasProfessor();
    }
    res.send([turmas_aux, status_list]);
});
servidor.get('/minha_turma', (req, res) => {
    res.send((turma_sessao));
});
servidor.post('/envia_turma', (req, res) => {
    let turma_aux = null;
    turma_aux = retornaTurma(req.body.codigo);
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
            let index = retornaIndexTurma();
            turma_modificada = new turma_1.Turma(nome, codigo, semestre, usuario_sessao);
            if (existeTurmaDiferente(turma_modificada, index)) {
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
    let turma_atual = retornaTurma(turma_sessao.Codigo);
    turmas = turmas.filter(obj => obj !== turma_atual);
    turma_sessao = null;
    res.send({
        success: 'Turma deletada do sistema com sucesso!',
    });
    console.log(turmas);
    console.log(turma_sessao);
});
servidor.post('/convidar_aluno', (req, res) => {
    let email = req.body.email;
    if (email == '') {
        res.send({
            failure: 'O email do convite não pode ser vazio!',
        });
    }
    else {
        let usuario_convidado = retornaAlunoConvidado(email);
        if (usuario_convidado == null) {
            res.send({
                failure: 'O usuario convidado não existe no sistema!',
            });
        }
        else {
            let index = retornaIndexTurma();
            let list_convidados = turmas[index].Lista_de_alunos;
            if (existeConvidado(list_convidados, email)) {
                res.send({
                    failure: 'O usuario já foi convidado!',
                });
            }
            else {
                turmas[index].Adicionar_convite(usuario_convidado, "Pendente");
                turma_sessao = turmas[index];
                res.send({
                    success: 'Usuario convidado com sucesso!',
                });
            }
        }
    }
    for (let turma of turmas) {
        console.log(turma);
        console.log(turma.Lista_de_alunos);
    }
    console.log(turma_sessao);
});
servidor.post('/atualiza_convite', (req, res) => {
    let codigo = req.body.codigo;
    let flag = req.body.flag; //boolean
    let resposta = procuraIndexAlunoConvidado(codigo);
    let index_turmas = resposta[0];
    let index_aluno = resposta[1];
    if (index_turmas == null || index_aluno == null) {
        res.send({
            failure: 'Usuário não encontrado!',
        });
    }
    else {
        if (flag) {
            turmas[index_turmas].Lista_de_alunos[index_aluno][1] = "Aceito";
            res.send({
                success: 'Convite aceito com sucesso!',
            });
        }
        else {
            atualizaListaAlunos(index_turmas);
            res.send({
                success: 'Convite rejeitado com sucesso!',
            });
        }
    }
    console.log(turmas);
    console.log(turmas[index_turmas].Lista_de_alunos);
});
var server = servidor.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
function closeServer() {
    server.close();
}
exports.closeServer = closeServer;
//# sourceMappingURL=server.js.map