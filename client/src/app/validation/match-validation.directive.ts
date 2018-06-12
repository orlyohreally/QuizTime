import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';


export function matchValidator(match_cntrl: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {    
    if(control.parent) {
        if( control.parent.controls[match_cntrl].value == control.value)
            return null;
    }
    return {'match': {value: control.value}};
  };
}

@Directive({
    selector: '[appLoginValidation]',
    providers: [{provide: NG_VALIDATORS, useExisting: matchValidatorDirective, multi: true}]
})
export class matchValidatorDirective implements Validator {
    @Input('appLoginValidation') match: string;

    validate(control: AbstractControl): {[key: string]: any} | null {
    return this.match ? matchValidator(this.match)(control)
                              : null;
    }
}

