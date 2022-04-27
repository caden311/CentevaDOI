import {Validator, NG_VALIDATORS} from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import {Directive} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true },
  ],
})
export class EmailValidator implements Validator {

  private static IsValidEmail(email: string) {
    // tslint:disable-next-line:max-line-length
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/g.test(email);
  }

  public static Validate(c: AbstractControl) {
    if (!c.value || EmailValidator.IsValidEmail(c.value)) {
      return null;
    } else {
      return {
        validEmail: {
          valid: false,
        },
      };
    }
  }
  public validate(c: AbstractControl) {
    return EmailValidator.Validate(c);
  }



}
