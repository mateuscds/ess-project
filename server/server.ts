import express = require('express');
import bodyParser = require("body-parser");

import { Usuario } from '../common/usuario';
import { Cadastro } from './cadastro';

var servidor = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

servidor.use(allowCrossDomain);
servidor.use(bodyParser.json());

let usuarios: Usuario[] = [];

servidor.post('/usuarios/cadastrar', bodyParser, (req: express.Request, res: express.Response) => {
    console.log(req.body);
})