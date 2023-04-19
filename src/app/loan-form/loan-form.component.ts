import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { FloatLabelType } from '@angular/material/form-field';
import { InterestCalculatorService } from '../services/interest-calculator.service';
import { MonthlyInterest } from '../interfaces/monthlyInterest';
import { LoanFormValues } from '../interfaces/loanFormValues';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss'],
})
export class LoanFormComponent {
  loanForm: FormGroup;
  savedData?: LoanFormValues;
  monthlyInterest$?: Observable<MonthlyInterest>;

  constructor(
    private fb: FormBuilder,
    private interestService: InterestCalculatorService
  ) {
    this.loanForm = this.fb.group({
      totalAmount: [
        '',
        [
          Validators.required,
          Validators.min(10000),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      downPayment: ['', [Validators.required]],
      termYears: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(30),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });

    this.loanForm.get('totalAmount')!.valueChanges.subscribe((totalAmount) => {
      const downPaymentControl = this.loanForm.get('downPayment');
      if (totalAmount >= 10000) {
        if (!downPaymentControl?.value || downPaymentControl?.pristine) {
          const downPayment = totalAmount * 0.15;
          downPaymentControl?.setValue(downPayment);
        }
        downPaymentControl?.setValidators([
          Validators.required,
          Validators.min(totalAmount * 0.15),
          Validators.max(totalAmount * 0.99),
          Validators.pattern('^[0-9]*$'),
        ]);
      } else {
        downPaymentControl?.reset();
      }
    });
  }

  get totalAmount() {
    return this.loanForm.get('totalAmount') as FormControl<number>;
  }

  get downPayment() {
    return this.loanForm.get('downPayment') as FormControl<number>;
  }

  get termYears() {
    return this.loanForm.get('termYears') as FormControl<number>;
  }

  getTotalAmountFloatLabelValue(): FloatLabelType {
    return this.loanForm.get('totalAmount')!.value || 'auto';
  }

  getDownPaymentFloatLabelValue(): FloatLabelType {
    return this.loanForm.get('downPayment')!.value || 'auto';
  }

  getTermYearsFloatLabelValue(): FloatLabelType {
    return this.loanForm.get('termYears')!.value || 'auto';
  }

  onLoanFormSubmit() {
    if (this.loanForm.valid) {
      this.savedData = this.loanForm.value;
      this.monthlyInterest$ = this.interestService.getMonthlyInterest(
        this.loanForm.value
      );
    }
  }

  onLoanFormReset() {
    this.loanForm.reset();
  }
}
