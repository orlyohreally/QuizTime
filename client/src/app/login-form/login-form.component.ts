import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { multiPatternValidator } from '../validation/login-validation.directive';
import { matchValidator } from '../validation/match-validation.directive';
import { User } from  '../user';
import { TestService } from '../test.service';
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
    constructor(private testService: TestService) { }
    
    username_regex = /^[a-z0-9_-]{5,15}$/;
    email_regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/;
    
    ngOnInit() {
        this.type = 'login';
        
        this.loginForm = new FormGroup({
            'login_login': new FormControl(this.data.login, [
                Validators.required,
                multiPatternValidator([this.username_regex, this.email_regex])
            ]),
            'login_password': new FormControl(this.data.password, [
                Validators.required,
                Validators.pattern(this.password_regex),
            ])
        });
        
        this.signinForm = new FormGroup({
            'signin_login': new FormControl(this.data.login, [
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
        var user;
        switch(this.type) {
            case 'login':
                form = this.loginForm;
                if(form.valid) {
                    user = new User(this.loginForm.get('login_login').value, this.loginForm.get('login_password').value);
                    this.testService.loginUser(user).subscribe(cur_user=>{console.log(cur_user);})
                }
                else 
                    this.validateForm(form);
                console.log(user);
                break;
            case 'signin':
                form = this.signinForm;
                if(form.valid) {
                    console.log(form.get('signin_login').value);
                    console.log(form.get('signin_password').value);
                    user = new User(form.get('signin_email').value, form.get('signin_password').value, form.get('signin_login').value);
                    console.log(user);
                    this.testService.registerUser(user).subscribe(cur_user=>{console.log(cur_user);})
                }
                else 
                    this.validateForm(form);
                break;
            case 'forgot_password':
                form = this.forgot_passwordForm;
                break;
        }
        /*if(form != null) {
            if(form.valid) {
                this.submitted = true;
                console.log(this.type +' submitted!');
                if(user) {
                    console.log('there is user');
                }
            }
            else {
                this.validateForm(form);
            }
        }*/
            
    }
}