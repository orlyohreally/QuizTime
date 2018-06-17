import { Injectable } from '@angular/core';
import { Topic } from './topic';
import { Step } from './step';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class TestService {
    getTopics(): Observable<any> {
        return this.http.get<any>(this.topicsUrl)
        .pipe(
            catchError(this.handleError('getTopics', []))
        );
    }
    getSteps(): Observable<any> {
        return this.http.get<any>(this.stepsUrl)
        .pipe(
            catchError(this.handleError('getSteps', []))
        );
    }
    
    loginUser(user: User): Observable<any> {
        return this.http.post<any>(this.loginUserUrl, {"user": user})
    }
    registerUser(user: User): Observable<any>  {
        return this.http.post(this.registerUserUrl, {"user": user});  
    }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
        console.error(error.httpErrorCode);
        let httpErrorCode = error.httpErrorCode;
        console.error(error);
        
        console.log(error.status, result);
        if(error.status == 400) {
            
        }
        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }
    
    constructor(
        private http: HttpClient
    ) { }
    private topicsUrl = 'http://localhost:8000/api/topics/';
    private stepsUrl = 'http://localhost:8000/api/steps/';
    private loginUserUrl = 'http://localhost:8000/api/users/login/';
    private registerUserUrl = 'http://localhost:8000/api/users/';
}