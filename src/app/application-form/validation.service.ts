import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  downPaymentValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const totalAmount = control.get('totalAmount');
    const downPayment = control.get('downPayment');
    console.log('validation working');
    return totalAmount &&
      downPayment &&
      downPayment.value < totalAmount.value * 0.15
      ? { downPaymentTooSmall: true }
      : null;
  };
}
