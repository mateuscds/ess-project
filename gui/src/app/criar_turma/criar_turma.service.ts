import { Usuario } from '../../../../common/usuario';
import { Professor } from '../../../../common/professor';
import { Aluno } from '../../../../common/aluno';
import { Turma } from '../../../../common/turma';

import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Injectable()
export class CriarTurmaService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private URL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    cadastro_turma(nome: string, codigo: string, semestre: string): Observable<String> {

        let informacoes = {'nome': nome, 'codigo': codigo, 'semestre': semestre};

        return this.http.post<any>(this.URL + '/criar_turma', informacoes).pipe(
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

    professor_responsavel(): Observable<Usuario>{
        return this.http.get<any>(this.URL + '/meu_usuario').pipe(
            retry(2)
        );
    }
}

