import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Duvida } from '../../../../common/duvida'

@Injectable()
export class BuscarDuvidaService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private URL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getTodasDuvidas(): Observable<Duvida[]> {
        return this.http.get<Duvida[]>(this.URL + '/duvidas').pipe(
            retry(2)
        )
    }
}