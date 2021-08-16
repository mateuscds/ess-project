import { Usuario } from '../../../../common/usuario';
import { Professor } from '../../../../common/professor';
import { Aluno } from '../../../../common/aluno';
import { Turma } from '../../../../common/turma';

import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';



@Injectable()
export class GerenciamentoTurmaService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private URL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    minha_turma(): Observable<Turma>{
        return this.http.get<any>(this.URL + '/minha_turma').pipe(
            retry(2)
        );
    }

    atualiza(nome: string, codigo: string, semestre: string): Observable<String> {
        let turma_modificada = { "nome" : nome, "codigo" : codigo, "semestre" : semestre};

        return this.http.post<any>(this.URL + '/atualiza_turma', turma_modificada).pipe(
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

    deleta(): Observable<String>{
        return this.http.post<any>(this.URL + '/deleta_turma', '').pipe(
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

    convidar(email: string): Observable<String>{

        let info = {"email": email};

        return this.http.post<any>(this.URL + '/convidar_aluno', info).pipe(
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