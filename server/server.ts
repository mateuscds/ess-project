import express = require('express');
//import bodyParser = require("body-parser");

import { Usuario } from '../common/usuario';
import { Aluno } from '../common/aluno';
import { Professor } from '../common/professor';
import { Cadastro } from './cadastro';

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

var server = servidor.listen(3000, function () {
    console.log('Example app listening on port 3000!')
 })
  
function closeServer(): void {
    server.close();
}
  
export { servidor, closeServer }
  