import { Injectable } from '@angular/core';
import {  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    if(this.authService.IsAuthenticated()) {
        request = request.clone({
            setHeaders: {
                Authorization: `Token ${this.authService.GetToken()}`
            }
        });
    }
    return next.handle(request);
  }
}
