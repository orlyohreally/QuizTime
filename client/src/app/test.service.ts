import { Injectable } from '@angular/core';
import { Topic } from './topic';
import { Step } from './step';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

@Injectable()
export class TestService {
    getTopics(): Observable<Topic[]> {
        return this.http.get<Topic[]>(this.topicsUrl)
        .pipe(
            catchError(this.handleError('getTopics', []))
        );
    }
    getSteps(): Observable<Step[]> {
        return this.http.get<Step[]>(this.stepsUrl)
        .pipe(
            catchError(this.handleError('getSteps', []))
        );
    }
    
    loginUser(user: User): Observable<User> {
        return this.http.post<User>(this.loginUserUrl, {"user": user})
        .pipe(
            catchError(this.handleError<User>('setUser'))
        );
    }
    registerUser(user: User): Observable<User> {
        return this.http.post<User>(this.registerUserUrl, {"user": user})
        .pipe(
            catchError(this.handleError<User>('setUser'))
        );
    }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
        console.error(error.httpErrorCode);
        let httpErrorCode = error.httpErrorCode;
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        //this.log(`${operation} failed: ${error.message}`);
        this.log(error.statusText);
        console.log(error.status);
       
        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }
    private log(message: string) {
        this.messageService.add('TestService: ' + message);
    }
    constructor(
        private http: HttpClient, private messageService: MessageService
    ) { }
    private topicsUrl = 'http://localhost:8000/api/topics/';
    private stepsUrl = 'http://localhost:8000/api/steps/';
    private loginUserUrl = 'http://localhost:8000/api/users/login/';
    private registerUserUrl = 'http://localhost:8000/api/users/';
}