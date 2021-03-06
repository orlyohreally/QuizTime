import { Injectable } from '@angular/core';
import { User } from './user';
import { Test } from './test';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Select2OptionData } from 'ng2-select2';
import 'rxjs/add/observable/of';
@Injectable()
export class TestService {
	getTopics(): Observable<any> {
		return this.http.get<any>(this.topicsUrl);
		/*.pipe(
            catchError(this.handleError('getTopics', []))
        )*/
	}
	getTests(): Observable<any> {
		return this.http.get<any>(this.testsUrl);
	}
	getTest(id): Observable<any> {
		return this.http.get<any>(this.testsUrl + id + '/');
	}
	postTest(test: Test): Observable<any> {
		const formData: FormData = new FormData();
		formData.append('name', test.name);
		formData.append('slug', test.slug);
		formData.append('icon', test.icon);
		formData.append('topic', test.topic + '');
		return this.http.post<any>(this.testsUrl, formData);
	}
	putTest(test: Test): Observable<any> {
		const formData: FormData = new FormData();
		formData.append('name', test.name);
		formData.append('slug', test.slug);
		formData.append('icon', test.icon);
		formData.append('topic', test.topic + '');
		formData.append('id', test.id + '');
		return this.http.put<any>(this.testsUrl + test.id + '/', formData);
	}
	deleteTest(test: Test): Observable<any> {
		const formData: FormData = new FormData();
		formData.append('name', test.name);
		formData.append('slug', test.slug);
		formData.append('icon', test.icon);
		formData.append('topic', test.topic + '');
		formData.append('id', test.id + '');
		return this.http.delete<any>(this.testsUrl + test.id + '/', formData);
	}
	getTopicsForSelect(): Observable<any[]> {
		return this.http.get<any>(this.topicsSelectUrl);
	}
	getSubjectsForSelect(): Observable<any[]> {
		return this.http.get<any>(this.subjectSelectUrl);
	}
	getSubjectsForSelectTopic(topic_id: number): Observable<any[]> {
		return this.http.get<any>(
			"http://localhost:8000/api/subjects-select/" +
				topic_id +
				"/subjects_by_topic/"
		);
		/*.pipe(
            catchError(this.handleError('getSubjectsForSelectTopic', []))
        )*/
	}
	getSteps(): Observable<any> {
		return this.http.get<any>(this.stepsUrl);
		/*.pipe(
            catchError(this.handleError('getSteps', []))
        )*/
	}

	loginUser(user: User): Observable<any> {
		return this.http.post<any>(this.loginUserUrl, { user: user });
	}
	registerUser(user: User): Observable<any> {
		return this.http.post(this.registerUserUrl, { user: user });
	}
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			/*let httpErrorCode = error.httpErrorCode;
            console.error(error);
            if(error.status == 403)

            return of(result as T);*/
			throw error;
		};
	}

	constructor(private http: HttpClient) {}
	private testsUrl = 'http://localhost:8000/api/quizzes/';
	private topicsUrl = 'http://localhost:8000/api/topics/';
	private topicsSelectUrl = 'http://localhost:8000/api/topics-select/';
	private subjectSelectUrl = 'http://localhost:8000/api/subjects-select/';
	private stepsUrl = 'http://localhost:8000/api/steps/';
	private loginUserUrl = 'http://localhost:8000/api/users/login/';
	private registerUserUrl = 'http://localhost:8000/api/users/';
}
