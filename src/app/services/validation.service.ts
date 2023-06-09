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
    const percentage = control.get('percentage');
    return totalAmount &&
      downPayment &&
      percentage &&
      downPayment.value < totalAmount.value * 0.15 &&
      percentage.value < 15
      ? { downPaymentTooSmall: true }
      : null;
  };
}
