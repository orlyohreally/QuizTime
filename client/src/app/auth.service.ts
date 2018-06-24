import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import * as jwt_decode from 'jwt-decode';

import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    unauthorizedAccess: boolean;
    public GetToken(): string {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);        
        return token;
    }
    public IsAuthenticated(): boolean {
        return localStorage.getItem('token') != null;
    }
    public LogIn(token: string) {
        localStorage.setItem('token', token);
    }
    public LogOut() {
        localStorage.removeItem('token');
        console.log('logged out');
    }
    constructor() { }
    
    LoginRequired: Subject<boolean> = new Subject<boolean>();
    ShowLoginModal(val) {
        console.log('ShowLoginModal ', val);
        this.unauthorizedAccess = val;
        this.LoginRequired.next(this.unauthorizedAccess);
    }
}
