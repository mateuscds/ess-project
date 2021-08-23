import { Usuario } from '../../../../common/usuario';
import { Professor } from '../../../../common/professor';
import { Aluno } from '../../../../common/aluno';
import { Turma } from '../../../../common/turma';
import { Notificador } from '../../../../common/notificador'

import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Injectable()
export class NotificadorService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private URL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    atualizar(): Observable<Notificador> {
        return this.http.get<any>(this.URL + '/notificacoes').pipe(
            retry(5)
        );
    }


    meu_usuario(): Observable<Usuario>{
        return this.http.get<any>(this.URL + '/meu_usuario').pipe(
            retry(2)
        );
    }


    limpar(): Observable<Usuario>{
        return this.http.get<any>(this.URL + '/limpar').pipe(
            retry(2)
        );
    }


}

