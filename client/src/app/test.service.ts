import { Injectable } from '@angular/core';
import { Topic } from './topic';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable()
export class TestService {
    getTopics (): Observable<Topic[]> {
        return this.http.get<Topic[]>(this.topicsUrl)
        .pipe(
            catchError(this.handleError('getTopics', []))
        );
    }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
    constructor(
        private http: HttpClient
    ) { }
    private topicsUrl = 'http://localhost:8000/tests/topics/';
}