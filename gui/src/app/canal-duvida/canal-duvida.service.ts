
import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Injectable()
export class CanalDuvidaService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private URL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    cadastrar_canal_duvida(topico: string, subtopico: string, descricao: string): Observable<String> {

        let canalDuvida = {'topico': topico, 'subtopico': subtopico, 'descricao': descricao};

        return this.http.post<any>(this.URL + '/criar_canal_duvida', canalDuvida).pipe(
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

