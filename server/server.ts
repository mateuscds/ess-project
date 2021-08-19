import express = require('express');
//import bodyParser = require("body-parser");

import { Usuario } from '../common/usuario';
import { Aluno } from '../common/aluno';
import { Professor } from '../common/professor';
import { Cadastro } from './cadastro';
import { Turma } from '../common/turma';
import { Notificador } from '../common/notificador';
import { Notificacao } from '../common/notificacao';

var servidor = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

servidor.use(allowCrossDomain);
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: true}));

let usuarios: Usuario[] = [];
let turmas: Turma[] = [];
let usuario_sessao = null;
let turma_sessao = null;
let notificadores: Notificador[] = [];

servidor.post('/usuarios/cadastrar', (req: express.Request, res: express.Response) => {
    let cpf = req.body.cpf;
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    let usuario;
    if(req.body.hasOwnProperty('mascara')){
        usuario = new Aluno(cpf, nome, email, senha);
    }
    else{
        usuario = new Professor(cpf, nome, email, senha);
    }

    let nulo = false;
    if (cpf === '' || nome === '' || email === '' || senha === ''){
        nulo = true;
    }

    if(nulo){
        res.send({
            failure: 'Alguma das entradas esta nula!',
        })
    }
    else{
        let existe = false;
        for (let i of usuarios){
            if(i.Cpf == usuario.Cpf || i.Email == usuario.Email){
                existe = true;
            }
        }

        if(existe){
            res.send({
                failure: 'Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!',
            })
        }
        else{
            //console.log(usuarios);
            usuarios.push(usuario);
            //console.log(usuarios);

            res.send({
                success: 'Usuario cadastrado com sucesso!',
            })
        }
        console.log(usuarios);
    }
})

servidor.get('/usuario', (req: express.Request, res: express.Response) => {
    res.send(JSON.stringify(Array.from(usuarios)));
})

servidor.post('/login', (req: express.Request, res: express.Response) => {
    let email = req.body.email;
    let senha = req.body.senha;
    
    let nulo = false;
    if(email === '' || senha === ''){
        nulo = true;
    }

    if(nulo){
        res.send({
            failure: 'E-mail ou senha nulos!',
        })
    }
    else{
        let existe = false;
        for (let i of usuarios){
            if(i.Email == email && i.Senha == senha){
                existe = true;
                usuario_sessao = i;
            }
        }

        if(existe){
            
            let index = 0;
            let flag = 0;

            if (notificadores.length == 0){
                notificadores.push(new Notificador(usuario_sessao.Cpf));
                console.log("Tava vazio");
            } else {
                for (let notificador of notificadores){
                    if (notificador.Cpf_user == usuario_sessao.Cpf){
                        notificadores[index] = new Notificador(usuario_sessao.Cpf);
                        console.log("Tava criado já");
                        flag = 1;
                    }
                    index += 1;
                }

                if (flag == 0){
                    notificadores.push(new Notificador(usuario_sessao.Cpf));
                    console.log("Nãoo tava criado");
                }
            }


            res.send({
                success: 'Login realizado com sucesso!',
            })
        }
        else{
            res.send({
                failure: 'E-mail ou senha incorretos!',
            })
        }
    }  
    console.log("memes");
    console.log(notificadores);  
    console.log(usuario_sessao);
})

servidor.post('/atualiza_cadastro', (req: express.Request, res: express.Response) => {
    if(usuario_sessao != null){
        let cpf = req.body.cpf;
        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;

        let usuario_modificado;
        if(usuario_sessao.hasOwnProperty('mascara')){
            usuario_modificado = new Aluno(cpf, nome, email, senha);
        }
        else{
            usuario_modificado = new Professor(cpf, nome, email, senha);
        }

        let nulo = false;
        if (cpf === '' || nome === '' || email === '' || senha === ''){
            nulo = true;
        }

        if(nulo){
            res.send({
                failure: 'Alguma das entradas esta nula!',
            })
        }
        else{
            let index = 0;
            for (let i of usuarios){
                if(i.Cpf == usuario_sessao.Cpf && i.Email == usuario_sessao.Email){
                    break;
                }
                index += 1;
            }

            let existe = false;
            let index_aux = 0;
            for (let i of usuarios){
                if((i.Cpf == usuario_modificado.Cpf || i.Email == usuario_modificado.Email) && index_aux != index){
                    existe = true;
                }
                index_aux += 1;
            }

            if(existe){
                res.send({
                    failure: 'Um outro usuario com esse CPF ou esse EMAIL ja existe na base de dados!',
                })
            }
            else{
                usuarios[index] = usuario_modificado;
                usuario_sessao = usuario_modificado;

                res.send({
                    success: 'Atualizacao realizada com sucesso!',
                })
            }
            console.log(usuarios);
            console.log(usuario_sessao);
        }
    }
    else{
        res.send({
            failure: 'Voce nao esta logado no sistema para atualizar seus dados!',
        })
    }  
})

servidor.get('/meu_usuario', (req: express.Request, res: express.Response) => {
    res.send((usuario_sessao));
})

servidor.post('/desloga', (req: express.Request, res: express.Response) => {

    usuario_sessao = null;
    
    res.send({
        success: 'Usuario deslogado do sistema com sucesso!',
    })
    
    console.log(usuario_sessao);
})

servidor.post('/deleta', (req: express.Request, res: express.Response) => {

    let usuario_atual;
    for (let i of usuarios){
        if(i.Cpf == usuario_sessao.Cpf && i.Email == usuario_sessao.Email){
            usuario_atual = i;
            break;
        }
    }
    usuarios = usuarios.filter(obj => obj !== usuario_atual);
    usuario_sessao = null;

    res.send({
        success: 'Usuario deletado do sistema com sucesso!',
    })

    console.log(usuarios);
    console.log(usuario_sessao);
})


servidor.post('/criar_turma', (req: express.Request, res: express.Response) => {
    let nome = req.body.nome;
    let codigo = req.body.codigo;
    let semestre = req.body.semestre;

    if(usuario_sessao == null){
        res.send({
            failure: 'Você não está logado como professor no sistema!',
        })
    }
    else{
        if(usuario_sessao.hasOwnProperty('mascara')){
            res.send({
                failure: 'Apenas professores podem realizar a criação de turmas!',
            })
        }
        else{
            
            let nulo = false;
            if(nome === '' || codigo === '' || semestre === ''){
                nulo = true;
            }
            
            if(nulo){
                res.send({
                    failure: 'Nome, codigo ou semestre nulos!',
                })
            }
            else{

                let existe = false;
                for (let i of turmas){
                    if(i.Codigo == codigo){
                        existe = true;
                    }
                }

                if(existe){
                    res.send({
                        failure: 'Já existe uma turma cadastrada com esse código!',
                    })
                }
                else{

                    let nova_turma = new Turma(nome, codigo, semestre, usuario_sessao);

                    turmas.push(nova_turma);

                    console.log(usuarios);

                    res.send({
                        success: 'Turma cadastrada com sucesso!',
                    })
                }
            }
        }

        console.log(turmas);
    }
})


servidor.get('/minhas_turmas', (req: express.Request, res: express.Response) => {

    let turmas_aux = [];
    let status_list = [];

    if(usuario_sessao.hasOwnProperty('mascara')){

        for (let i of turmas){

            let student_list = i.Lista_de_alunos;

            for (let j of student_list){

                if(j[0].Cpf == usuario_sessao.Cpf){
                    turmas_aux.push(i);
                    status_list.push(j[1]);
                }
            }
        }        
    }
    else{
        for (let i of turmas){
            if(usuario_sessao.Cpf == i.Professor_responsavel.Cpf){
                turmas_aux.push(i);
            }
        }
    }

    res.send([turmas_aux, status_list]);
})


servidor.get('/minha_turma', (req: express.Request, res: express.Response) => {

    res.send((turma_sessao));
})



servidor.post('/envia_turma', (req: express.Request, res: express.Response) => {

    let turma_aux = null;

    for (let i of turmas){

        if(req.body.codigo == i.Codigo){
            turma_aux = i;
            break;
        }
    }

    turma_sessao = turma_aux;

    res.send({
        success: 'Turma registrada com sucesso!',
    })

    console.log("Turma sessão: ", turma_sessao);
})


servidor.post('/atualiza_turma', (req: express.Request, res: express.Response) => {

    if(usuario_sessao != null){
        
        let nome = req.body.nome;
        let codigo = req.body.codigo;
        let semestre = req.body.semestre;

        let turma_modificada = null;

        let nulo = false;
        if (nome === '' || codigo === '' || semestre === ''){
            nulo = true;
        }

        if(nulo){
            res.send({
                failure: 'Alguma das entradas esta nula!',
            })
        }
        else{
            let index = 0;
            for (let i of turmas){
                if(i.Codigo == turma_sessao.Codigo){
                    break;
                }
                index += 1;
            }

            let existe = false;
            let index_aux = 0;

            turma_modificada = new Turma(nome, codigo, semestre, usuario_sessao);

            for (let i of turmas){
                if((i.Codigo == turma_modificada.Codigo) && index_aux != index){
                    existe = true;
                }
                index_aux += 1;
            }

            if(existe){
                res.send({
                    failure: 'Uma outra turma com esse código ja existe na base de dados!',
                })
            }
            else{
                turmas[index] = turma_modificada;
                turma_sessao = turma_modificada;

                res.send({
                    success: 'Atualizacao realizada com sucesso!',
                })
            }
            console.log(turmas);
            console.log(turma_sessao);
        }
    }
})


servidor.post('/deleta_turma', (req: express.Request, res: express.Response) => {

    let turma_atual;
    for (let i of turmas){
        if(i.Codigo == turma_sessao.Codigo){
            turma_atual = i;
            break;
        }
    }
    turmas = turmas.filter(obj => obj !== turma_atual);
    turma_sessao = null;

    res.send({
        success: 'Turma deletada do sistema com sucesso!',
    })

    console.log(turmas);
    console.log(turma_sessao);
})



servidor.post('/convidar_aluno', (req: express.Request, res: express.Response) => {

    let email = req.body.email;

    if(email == ''){
        res.send({
            failure: 'O email do convite não pode ser vazio!',
        })
    }
    else{

        let usuario_convidado = null;
        for (let i of usuarios){
            if(i.Email == email){
                usuario_convidado = i;
                break;
            }
        }

        if(usuario_convidado == null){
            res.send({
                failure: 'O usuario convidado não existe no sistema!',
            })
        }
        else{

            let index = 0;
            for (let i of turmas){
                if(i.Codigo == turma_sessao.Codigo){
                    break;
                }
                index += 1;
            }

            let list_convidados = turmas[index].Lista_de_alunos;
            let exists = false;

            for (let i of list_convidados){
                if(i[0].Email == email){
                    exists = true;
                    break;
                }
            }

            if(exists){
                res.send({
                    failure: 'O usuario já foi convidado!',
                })
            }
            else{
                turmas[index].Adicionar_convite(usuario_convidado, "Pendente");
                turma_sessao = turmas[index];

                res.send({
                    success: 'Usuario convidado com sucesso!',
                })
            }
        }
    }

    for (let turma of turmas){
        console.log(turma);
        console.log(turma.Lista_de_alunos);
    }
})



servidor.post('/atualiza_convite', (req: express.Request, res: express.Response) => {

    let codigo = req.body.codigo;
    let flag = req.body.flag; //boolean

    let index_turmas = 0;
    let index_aluno = 0;

    for (let turma of turmas){

        if(codigo == turma.Codigo){

            for (let aluno of turma.Lista_de_alunos){

                if(aluno[0].Cpf == usuario_sessao.Cpf){
                    break;
                }

                index_aluno += 1;
            }
            break;
        }

        index_turmas += 1;
    }

    if(index_turmas == null || index_aluno == null){

        res.send({
            failure: 'Usuário não encontrado!',
        })
    }
    else{

        if(flag){
            turmas[index_turmas].Lista_de_alunos[index_aluno][1] = "Aceito";

            res.send({
                success: 'Convite aceito com sucesso!',
            })
        }
        else{

            let lista_alunos_aux = [];

            for (let aluno of turmas[index_turmas].Lista_de_alunos){

                if(aluno[0].Cpf != usuario_sessao.Cpf){
                    lista_alunos_aux.push(aluno);
                }
            }

            turmas[index_turmas].Lista_de_alunos = lista_alunos_aux;

            res.send({
                success: 'Convite rejeitado com sucesso!',
            })
        }
    }
    console.log(turmas);
    console.log(turmas[index_turmas].Lista_de_alunos);
})




servidor.get('/notificacoes', (req: express.Request, res: express.Response) => {
    let key = -1;
    let index = 0;
    for (let usuario of usuarios){
        if (usuario.Cpf == usuario_sessao.Cpf){
            key = index;
        }
        index += 1;
    }
    console.log("Achei esse cara: ")
    console.log(notificadores[key])
    
    if (key == -1) {
        console.log("Ninguem key = -1")
    }

    res.send((notificadores[key]));
})




servidor.get('/logado', (req: express.Request, res: express.Response) => {
    res.send((usuario_sessao));
})

var server = servidor.listen(3000, function () {
    console.log('Example app listening on port 3000!')
 })
  
function closeServer(): void {
    server.close();
}
  
export { servidor, closeServer }
  