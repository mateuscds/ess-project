import { Usuario } from '../../../../common/usuario';
import { Professor } from '../../../../common/professor';
import { Aluno } from '../../../../common/aluno';
import { Turma } from '../../../../common/turma';

import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Injectable()
export class MinhasTurmasService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private URL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    retorna_minhas_turmas(): Observable<[Turma [], string []]>{
        return this.http.get<any>(this.URL + '/minhas_turmas').pipe(
            retry(2)
        );
    }

    envia_turma(codigo: string): Observable<String>{

        let info = {"codigo" : codigo};

        return this.http.post<any>(this.URL + '/envia_turma', info).pipe(
            retry(2),
            map(res => {
                if (res.success) {
                    return res.success;
                } else {
                    return res.failure;
                }
            })
        );
    }

    meu_usuario(): Observable<Usuario>{
        return this.http.get<any>(this.URL + '/meu_usuario').pipe(
            retry(2)
        );
    }

    atualiza_convite(codigo: string, flag: boolean): Observable<String>{

        let info = {"codigo" : codigo, "flag": flag};

        return this.http.post<any>(this.URL + '/atualiza_convite', info).pipe(
            retry(2),
            map(res => {
                if (res.success) {
                    return res.success;
                } else {
                    return res.failure;
                }
            })
        );
    }
}