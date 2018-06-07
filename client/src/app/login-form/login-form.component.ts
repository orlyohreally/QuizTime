import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() data: any;
  
  //model = new User('token1212', 'login1221', 'passwo212fcrd');
  submitted = false;
  onSubmit() { this.submitted = true; console.log('submitted!');}
  
  //remove
  get diagnostic() {
    return JSON.stringify(this.data);
  }
  
  constructor() { }

  ngOnInit() {
  
  }

}