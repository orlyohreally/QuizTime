import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() data: any;
  type: string;
  submitted = false;
  
  constructor() { }

  ngOnInit() {
    this.type = 'login';
  }
  showRegisterForm() {
    this.type = 'signin';
  }
  showLoginForm() {
    this.type = 'login';
  }
  showForgotPasswordForm() {
    this.type = 'forgot_password';
  }
  login() { 
    this.submitted = true; console.log('login submitted!');
  }
  signin() { 
    this.submitted = true; console.log('signin submitted!');
  }  
}