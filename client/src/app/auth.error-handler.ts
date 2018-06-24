import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './auth.service';
import{ Router } from '@angular/router';
@Injectable()
export class AuthErrorHandler implements ErrorHandler {

    constructor(private authService: AuthService, private injector: Injector) {}
  
    handleError(error: any) {
        if(error.status == 401 || error.status == 403) {
            console.log('auth error', error);
            localStorage.removeItem('token');
            //const router = this.injector.get(Router);
            //router.navigate(['']);
        }
        
        else throw error;
    }
}
