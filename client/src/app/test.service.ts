import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Select2OptionData } from 'ng2-select2';
import 'rxjs/add/observable/of';
@Injectable()
export class TestService {
    getTopics(): Observable<any> {
        return this.http.get<any>(this.topicsUrl)
        .pipe(
            catchError(this.handleError('getTopics', []))
        );
    }
    getTests(): Observable<any> {
        return this.http.get<any>(this.testsUrl)
        .pipe(
            catchError(this.handleError('getTests', []))
        );
    }
    getTopicsForSelect(): Observable<any[]> {
        return this.http.get<any>(this.topicsSelectUrl)
        .pipe(
            catchError(this.handleError('getTopicsForSelect', []))
        );
    }
    getSubjectsForSelect(): Observable<any[]> {
        return this.http.get<any>(this.subjectSelectUrl)
        .pipe(
            catchError(this.handleError('getSubjectsForSelect', []))
        );
    }
    getSubjectsForSelectTopic(topic_id: number): Observable<any[]> {
        return this.http.get<any>('http://localhost:8000/api/subjects-select/' + topic_id + '/subjects_by_topic/')
        .pipe(
            catchError(this.handleError('getSubjectsForSelectTopic', []))
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
    private testsUrl = 'http://localhost:8000/api/quizzes/';
    private topicsUrl = 'http://localhost:8000/api/topics/';
    private topicsSelectUrl = 'http://localhost:8000/api/topics-select/';
    private subjectSelectUrl = 'http://localhost:8000/api/subjects-select/';
    private stepsUrl = 'http://localhost:8000/api/steps/';
    private loginUserUrl = 'http://localhost:8000/api/users/login/';
    private registerUserUrl = 'http://localhost:8000/api/users/';
}