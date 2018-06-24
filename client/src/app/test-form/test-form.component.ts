import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Select2OptionData } from 'ng2-select2';
import { TestService } from '../test.service';
import { Test } from '../Test';
@Component({
    selector: 'app-test-form',
    templateUrl: './test-form.component.html',
    styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
    @Input() data: Test;
    testForm: FormGroup;
    errors: string[];
    public topics:Observable<Select2OptionData[]>;
    constructor(private testService: TestService) { }
    
    username_regex = /^[a-z0-9_-]{5,15}$/;
    
    ngOnInit() {
        this.data.id = 0;
        this.topics = this.testService.getTopicsForSelect();
        
        this.testForm = new FormGroup({
            'test_name': new FormControl(this.data.name, [
                Validators.required
            ]),
            'test_slug': new FormControl(this.data.slug, [
                Validators.required
            ]),
            'test_icon': new FormControl(this.data.icon, [
                Validators.required
            ])
        });
    }
    
    get test_name() { return this.testForm.get('test_name'); }
    get test_slug() { return this.testForm.get('test_slug'); }
    get test_icon() { return this.testForm.get('test_icon'); }
    
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
    
    CreateTest() {
        this.errors = [];
        if(this.testForm.valid) {
            console.log('all valid');
            var test = new Test(this.testForm.get('test_name').value, this.testForm.get('test_slug').value, this.testForm.get('test_icon').value, this.data.id);
            console.log(test);
            this.testService.postTest(test).subscribe(
                test => {
                    console.log('success', test);
                    
                },
                HttpErrorResponse => {
                    console.log(HttpErrorResponse);
                    for (let field in HttpErrorResponse.error.errors) {
                        console.log(HttpErrorResponse.error.errors[field]);
                        HttpErrorResponse.error.errors[field].forEach(error=>{
                            if(field != 'error')
                               this.testForm.controls['test_' + field].setErrors({'server': error});
                            else
                               this.errors.push(error);
                        });
                    }
                }
            );
        }
        else 
            this.validateForm(this.testForm);
    }
    
    
}