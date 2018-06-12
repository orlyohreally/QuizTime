import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';


export function multiPatternValidator(patterns: RegExp[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    
    for(let pattern of patterns) {
        const valid = pattern.test(control.value);
        if(valid)
            return null;
    }
    return {'multiPattern': {value: control.value}};
  };
}

@Directive({
    selector: '[appLoginValidation]',
    providers: [{provide: NG_VALIDATORS, useExisting: LoginValidatorDirective, multi: true}]
})
export class LoginValidatorDirective implements Validator {
    @Input('appLoginValidation') multiPattern: RegExp[];

    validate(control: AbstractControl): {[key: string]: any} | null {
    return this.multiPattern ? multiPatternValidator(this.multiPattern)(control)
                              : null;
    }
}

