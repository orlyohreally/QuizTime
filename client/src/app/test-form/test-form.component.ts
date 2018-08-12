import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {delay} from 'rxjs/operators/delay';
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
    test_topic: any;
    public topics:Observable<Select2OptionData[]>;
    public selected_topic:Observable<string>;
    constructor(private testService: TestService) { }
    icon: any;
    username_regex = /^[a-z0-9_-]{5,15}$/;
    
    ngOnInit() {console.log(this.data.topic, this.data.id);
        this.topics = this.testService.getTopicsForSelect();
        this.selected_topic = Observable.create(obs=>{
            obs.next(this.data.topic+'');
            obs.complete();
        }).pipe(delay(4000));
        this.selected_topic.subscribe(topic =>{
            console.log('topic', topic);
        });
        this.test_topic = {};
        this.test_topic.errors = [];
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
    
    TopicChanged(e) {
        console.log('topic changed', e, e.value, this.topics);
        this.test_topic.value = e.value;
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

    onFileChange(event) {
        let reader =new FileReader();
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.icon = file;
            }
        }
    }
    
    CreateTest() {
        this.errors = [];
        if(this.testForm.valid) {
            var test = new Test(this.testForm.get('test_name').value, this.testForm.get('test_slug').value, this.icon, this.test_topic.value);
            this.testService.postTest(test).subscribe(
                test => {
                    console.log('success', test);
                    
                },
                HttpErrorResponse => {
                    console.log(HttpErrorResponse);
                    for (let field in HttpErrorResponse.error.errors) {
                        console.log(HttpErrorResponse.error.errors[field]);
                        this.test_topic.errors = [];
                        HttpErrorResponse.error.errors[field].forEach(error=>{
                            if(field != 'error') {
                                if (field == 'topic')
                                    this.test_topic.errors.push(error);
                                else
                                    this.testForm.controls['test_' + field].setErrors({'server': error});
                               
                               }
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
    UpdateTest() {
        this.errors = [];
        if(this.testForm.valid) {
            var test = new Test(this.testForm.get('test_name').value, this.testForm.get('test_slug').value, this.icon, this.test_topic.value, this.data.id);
            this.testService.putTest(test).subscribe(
                test => {
                    console.log('success', test);
                    
                },
                HttpErrorResponse => {
                    console.log(HttpErrorResponse);
                    for (let field in HttpErrorResponse.error.errors) {
                        console.log(HttpErrorResponse.error.errors[field]);
                        this.test_topic.errors = [];
                        HttpErrorResponse.error.errors[field].forEach(error=>{
                            if(field != 'error') {
                                if (field == 'topic')
                                    this.test_topic.errors.push(error);
                                else
                                    this.testForm.controls['test_' + field].setErrors({'server': error});
                               
                               }
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
    DeleteTest() {
        this.errors = [];
        if(this.testForm.valid) {
            var test = new Test(this.testForm.get('test_name').value, this.testForm.get('test_slug').value, this.icon, this.test_topic.value, this.data.id);
            this.testService.deleteTest(test).subscribe(
                test => {
                    console.log('success', test);
                    
                },
                HttpErrorResponse => {
                    console.log(HttpErrorResponse);
                    for (let field in HttpErrorResponse.error.errors) {
                        console.log(HttpErrorResponse.error.errors[field]);
                        this.test_topic.errors = [];
                        HttpErrorResponse.error.errors[field].forEach(error=>{
                            if(field != 'error') {
                                if (field == 'topic')
                                    this.test_topic.errors.push(error);
                                else
                                    this.testForm.controls['test_' + field].setErrors({'server': error});
                               
                               }
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