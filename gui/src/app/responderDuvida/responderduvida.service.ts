import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Duvida } from '../../../../common/duvida'
import { Thread } from '../../../../common/thread'

@Injectable()
export class ResponderDuvidaService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private URL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    responder(discursao: string, id: number): Observable<String> {
       
        let thread;
        thread = new Thread(discursao, id);
    
        return this.http.post<any>(this.URL + '/responder', thread).pipe(
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

    getTodasThreads(): Observable<Thread[]> {
        return this.http.get<Thread[]>(this.URL + '/threads').pipe(
            retry(2)
        )
    }
    getTodasDuvidas(): Observable<Duvida[]> {
        return this.http.get<Duvida[]>(this.URL + '/duvidas').pipe(
            retry(2)
        )
    }
}