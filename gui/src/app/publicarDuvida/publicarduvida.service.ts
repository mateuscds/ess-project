import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Duvida } from '../../../../common/duvida'

@Injectable()
export class PublicarDuvidaService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private URL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    cadastrar(titulo: string, status: boolean, assunto: string, descricao: string): Observable<String> {
       
        let duvida;
        duvida = new Duvida(titulo, status, assunto, descricao);
    
        return this.http.post<any>(this.URL + '/publicar', duvida).pipe(
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

    getTodasDuvidas(): Observable<Duvida[]> {
        return this.http.get<Duvida[]>(this.URL + '/duvidas').pipe(
            retry(2)
        )
    }
}