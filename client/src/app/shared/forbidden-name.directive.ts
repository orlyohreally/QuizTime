import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';


export function multiPatternValidator(patterns: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    
    for(let pattern_str of patterns) {
        const pattern = new RegExp(pattern_str, 'i')
        const valid = pattern.test(control.value);
        if(valid)
            return null;
    }
    return {'multiPattern': {value: control.value}};
  };
}

@Directive({
    selector: '[appForbiddenName]',
    providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator {
    @Input('appForbiddenName') multiPattern: string[];

    validate(control: AbstractControl): {[key: string]: any} | null {
    return this.multiPattern ? multiPatternValidator(this.multiPattern)(control)
                              : null;
    }
}

