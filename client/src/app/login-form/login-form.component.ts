import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { multiPatternValidator } from '../shared/forbidden-name.directive';

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
    constructor() { }
    
    username_pattern = "^[a-z0-9_-]{5,15}$";
    password_pattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,12}$";
    email_pattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    ngOnInit() {
        this.type = 'login';
        
        this.loginForm = new FormGroup({
            'login_login': new FormControl(this.data.login, [
                Validators.required,
                multiPatternValidator([this.username_pattern, this.email_pattern])
            ]),
            'login_password': new FormControl(this.data.password, [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(this.password_pattern),
            ])
        });
        
        this.signinForm = new FormGroup({
            'signin_login': new FormControl(this.data.login, [
                Validators.required,
                Validators.pattern(this.username_pattern),
            ]),
            'signin_password': new FormControl(this.data.password, [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(this.password_pattern),
            ]),
            'signin_password_ver': new FormControl(this.data.password, [
                Validators.required,
                Validators.pattern(this.password_pattern),
            ]),
            'signin_email': new FormControl(this.data.email, [
                Validators.required,
                Validators.pattern(this.email_pattern),
            ]),
            'signin_agreement': new FormControl(this.data.agreement, [
                Validators.required,
            ]),
        });
        
        this.forgot_passwordForm = new FormGroup({
            'forgot_password_email': new FormControl(this.data.email, [
                Validators.required,
                Validators.pattern(this.email_pattern),
            ]),
        });
    }
    
    get login_login() { return this.loginForm.get('login_login'); }
    get login_password() { return this.loginForm.get('login_password'); }
    
    
    get signin_login() { return this.signinForm.get('signin_login'); }
    get signin_password() { return this.signinForm.get('signin_password'); }
    get signin_password_ver() { return this.signinForm.get('signin_password_ver'); }
    get signin_email() { return this.signinForm.get('signin_email'); }
    get signin_agreement() { return this.signinForm.get('signin_agreement'); }


    get forgot_password_email() { return this.forgot_passwordForm.get('forgot_password_email'); }
    
    showRegisterForm() {
        this.type = 'signin';
    }
    showLoginForm() {
        this.type = 'login';
    }
    showForgotPasswordForm() {
        this.type = 'forgot_password';
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
        var form = null;
        switch(this.type) {
            case 'login':
                form = this.loginForm;
                break;
            case 'signin':
                form = this.signinForm;
                break;
            case 'forgot_password':
                form = this.forgot_passwordForm;
                break;
        }
        if(form != null) {
            if(form.valid) {
                this.submitted = true;
                console.log(this.type +' submitted!');
            }
            else {
                this.validateForm(form);
            }
        }
            
    }
    /*submit_login() {
        if(this.loginForm.valid) {
            this.submitted = true;
            console.log('login submitted!');
        }
        else {
            this.validateForm(this.loginForm);
        }
    }
    submit_signin() { 
        if(this.signinForm.valid) {
            this.submitted = true;
            console.log('signin submitted!');
        }
        else {
            this.validateForm(this.signinForm);
        }
    }  
    submit_forgot_password() { 
        if(this.forgot_passwordForm.valid) {
            this.submitted = true;
            console.log('forgot_password submitted!');
        }
        else {
            this.validateForm(this.forgot_passwordForm);
        }
    }*/
}