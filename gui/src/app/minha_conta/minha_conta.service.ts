import { Usuario } from '../../../../common/usuario';
import { Professor } from '../../../../common/professor';
import { Aluno } from '../../../../common/aluno';

import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Injectable()
export class MinhaContaService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private URL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    atualiza(cpf: string, nome: string, email: string, senha: string): Observable<String> {
        let usuario_modificado = new Usuario(cpf, nome, email, senha);
        return this.http.post<any>(this.URL + '/atualiza_cadastro', usuario_modificado).pipe(
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

    desloga(): Observable<String>{
        return this.http.post<any>(this.URL + '/desloga', '').pipe(
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
        return this.http.post<any>(this.URL + '/deleta', '').pipe(
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