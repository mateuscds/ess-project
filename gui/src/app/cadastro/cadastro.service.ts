import { Usuario } from '../../../../common/usuario';
import { Professor } from '../../../../common/professor';
import { Aluno } from '../../../../common/aluno';

import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Injectable()
export class CadastroService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private URL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    cadastrar(cpf: string, nome: string, email: string, senha: string): Observable<String> {
        var usuario = new Usuario(cpf, nome, email, senha);

        return this.http.post<any>(this.URL + '/usuarios/cadastrar', usuario).pipe(
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

    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<any>(this.URL + '/usuario').pipe(
            retry(2)
        );
    }
}