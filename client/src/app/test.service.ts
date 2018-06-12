import { Injectable } from '@angular/core';
import { Topic } from './topic';
import { Step } from './step';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
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
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
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
    
    constructor(
        private http: HttpClient
    ) { }
    private topicsUrl = 'http://localhost:8000/api/topics/';
    private stepsUrl = 'http://localhost:8000/api/steps/';
    private loginUserUrl = 'http://localhost:8000/api/users/login/';
    private registerUserUrl = 'http://localhost:8000/api/users/';
}