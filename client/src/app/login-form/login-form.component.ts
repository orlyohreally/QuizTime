import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { multiPatternValidator } from '../validation/login-validation.directive';
import { matchValidator } from '../validation/match-validation.directive';
import { User } from  '../user';
import { TestService } from '../test.service';
import { ModalService } from '../modal.service';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
    @Input() data: any;
    loginForm: FormGroup;
    signinForm: FormGroup;
    forgot_passwordForm: FormGroup;
    type: string;
    submitted = false;
    errors: string[];
    
    constructor(private testService: TestService, private modalService: ModalService, private authService: AuthService) {
    
    }
    
    username_regex = /^[a-z0-9_-]{5,15}$/;
    email_regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/;
    
    ngOnInit() {
        this.type = 'login';
        this.errors = [];
        this.loginForm = new FormGroup({
            'login_username': new FormControl(this.data.login, [
                Validators.required,
                multiPatternValidator([this.username_regex, this.email_regex])
            ]),
            'login_password': new FormControl(this.data.password, [
                Validators.required,
                Validators.pattern(this.password_regex),
            ])
        });
        
        this.signinForm = new FormGroup({
            'signin_username': new FormControl(this.data.login, [
                Validators.required,
                Validators.pattern(this.username_regex),
            ]),
            'signin_password': new FormControl(this.data.password, [
                Validators.required,
                Validators.pattern(this.password_regex),
            ]),
            'signin_password_ver': new FormControl(this.data.password, [
                Validators.required,
                Validators.pattern(this.password_regex),
                matchValidator('signin_password')
            ]),
            'signin_email': new FormControl(this.data.email, [
                Validators.required,
                Validators.pattern(this.email_regex),
            ]),
            'signin_agreement': new FormControl(this.data.agreement, [
                Validators.required,
            ]),
        });
        
        this.forgot_passwordForm = new FormGroup({
            'forgot_password_email': new FormControl(this.data.email, [
                Validators.required,
                Validators.pattern(this.email_regex),
            ]),
        });
    }
    
    get login_username() { return this.loginForm.get('login_username'); }
    get login_password() { return this.loginForm.get('login_password'); }
    
    
    get signin_username() { return this.signinForm.get('signin_username'); }
    get signin_password() { return this.signinForm.get('signin_password'); }
    get signin_password_ver() { return this.signinForm.get('signin_password_ver'); }
    get signin_email() { return this.signinForm.get('signin_email'); }
    get signin_agreement() { return this.signinForm.get('signin_agreement'); }


    get forgot_password_email() { return this.forgot_passwordForm.get('forgot_password_email'); }
    
    showRegisterForm() {
        this.type = 'signin';
        this.errors = [];
    }
    showLoginForm() {
        this.type = 'login';
        this.errors = [];
    }
    showForgotPasswordForm() {
        this.type = 'forgot_password';
        this.errors = [];
    }
    validateForm(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field=> {
            const control = formGroup.get(field);
            if(control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            }
            else if(control instanceof FormGroup) {
                this.validateForm(control);
            }
        });
    }
    submit_form() {
        this.errors = [];
        var form = null;
        var l_user;
        switch(this.type) {
            case 'login':
                form = this.loginForm;
                if(form.valid) {
                    l_user = new User(this.loginForm.get('login_username').value, this.loginForm.get('login_password').value);
                    this.testService.loginUser(l_user).subscribe(
                        user => {
                            console.log('success', user, user.user, user.user.token);
                            this.authService.LogIn(user.user.token);
                            this.modalService.LoadComponentModal(null);
                        },
                        HttpErrorResponse => {
                            console.log(HttpErrorResponse);
                            for (let field in HttpErrorResponse.error.errors) {
                                console.log(HttpErrorResponse.error.errors[field]);
                                HttpErrorResponse.error.errors[field].forEach(error=>{
                                    if(field != 'error')
                                       form.controls['login_' + field].setErrors({'server': error});
                                    else
                                       this.errors.push(error);
                                });
                            }
                        }
                    );
                }
                else 
                    this.validateForm(form);
                break;
            case 'signin':
                form = this.signinForm;
                if(form.valid) {
                    l_user = new User(form.get('signin_email').value, form.get('signin_password').value, form.get('signin_username').value);
                    console.log(l_user);
                    this.testService.registerUser(l_user).subscribe(
                        user => {
                            console.log('success', user);
                            this.authService.LogIn(user.user.token);
                            this.modalService.LoadComponentModal(null);
                        },
                        HttpErrorResponse => {
                            console.log(HttpErrorResponse, HttpErrorResponse.error.errors.error);
                            for (let field in HttpErrorResponse.error.errors) {
                                HttpErrorResponse.error.errors[field].forEach(error=>{
                                    if(field != 'error')
                                        form.controls['signin_' + field].setErrors({'server': error});
                                     else
                                        this.errors.push(error);
                                });
                            }
                        }
                    );
                }
                else 
                    this.validateForm(form);
                break;
            case 'forgot_password':
                form = this.forgot_passwordForm;
                break;
        }
    }
}