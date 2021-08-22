import express = require('express');

import { Usuario } from '../common/usuario';
import { Aluno } from '../common/aluno';
import { Professor } from '../common/professor';
import { Cadastro } from './cadastro';
import { Turma } from '../common/turma';

function ehAluno(objeto: Usuario) { 
    if(objeto.hasOwnProperty('mascara')){
        return true;
    }
    else{
        return false;
    }
}

function existeUsuario(objeto: Usuario) { 
    let existe = false;
    for (let i of usuarios){
        if(i.Cpf == objeto.Cpf || i.Email == objeto.Email){
            existe = true;
        }
    }
    return existe;
}

function existeUsuarioCadastrado(email: string, senha: string) { 
    let existe = false;
    let usuario_sessao_aux = null;
    for (let i of usuarios){
        if(i.Email == email && i.Senha == senha){
            existe = true;
            usuario_sessao_aux = i;
        }
    }
    return [existe, usuario_sessao_aux];
}

function encontraIndexUsuario() { 
    let index = 0;
    for (let i of usuarios){
        if(i.Cpf == usuario_sessao.Cpf && i.Email == usuario_sessao.Email){
            break;
        }
        index += 1;
    }
    return index;
}

function existeUsuarioDiferente(objeto: Usuario, index: number) { 
    let existe = false;
    let index_aux = 0;
    for (let i of usuarios){
        if((i.Cpf == objeto.Cpf || i.Email == objeto.Email) && index_aux != index){
            existe = true;
        }
        index_aux += 1;
    }
    return existe;
}

function deletaUsuario() { 
    let usuario_atual;
    for (let i of usuarios){
        if(i.Cpf == usuario_sessao.Cpf && i.Email == usuario_sessao.Email){
            usuario_atual = i;
            break;
        }
    }
    usuarios = usuarios.filter(obj => obj !== usuario_atual);
}

function deletaUsuarioDasTurmas() { 
    let objeto_auxiliar = null;
    let index = 0;
    if(ehAluno(usuario_sessao)){
        for (let t of turmas){

            let lista_de_alunos = t.Lista_de_alunos;
            for (let a of lista_de_alunos){

                let student = a[0];
                if (student.Cpf == usuario_sessao.Cpf){
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

servidor.post('/usuarios/cadastrar', (req: express.Request, res: express.Response) => {
    let cpf = req.body.cpf;
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    let usuario;
    if(ehAluno(req.body)){
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

        if(existeUsuario(usuario)){
            res.send({
                failure: 'Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!',
            })
        }
        else{
            usuarios.push(usuario);

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

        let resposta = existeUsuarioCadastrado(email, senha);
        let existe = resposta[0];
        usuario_sessao = resposta[1];

        if(existe){
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
    console.log(usuario_sessao);
})

servidor.post('/atualiza_cadastro', (req: express.Request, res: express.Response) => {
    if(usuario_sessao != null){
        let cpf = req.body.cpf;
        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;

        let usuario_modificado;
        if(ehAluno(usuario_sessao)){
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
            let index = encontraIndexUsuario();
            
            if(existeUsuarioDiferente(usuario_modificado, index)){
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

    if(usuario_sessao != null){
        
        deletaUsuario();
        
        //removendo aluno deletado das turmas que ele pertence
        deletaUsuarioDasTurmas();

        usuario_sessao = null;

        res.send({
            success: 'Usuario deletado do sistema com sucesso!',
        })

        console.log(usuarios);
        console.log(usuario_sessao);
    }
    else{
        res.send({
            failure: 'Nenhum usuario foi deletado do sistema!',
        })
    }
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


var server = servidor.listen(3000, function () {
    console.log('Example app listening on port 3000!')
 })
  
function closeServer(): void {
    server.close();
}
  
export { servidor, closeServer }
  