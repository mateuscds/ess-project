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

    retorna_minhas_turmas(): Observable<Turma []>{
        return this.http.get<any>(this.URL + '/minhas_turmas').pipe(
            retry(2)
        );
    }
}