import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss'],
})
export class LoanFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  loanForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      totalAmount: ['', [Validators.required, Validators.min(1000)]],
      downPayment: ['', [Validators.required]],
      termYears: [
        '',
        [Validators.required, Validators.min(1), Validators.max(30)],
      ],
    });

    this.loanForm.get('totalAmount')!.valueChanges.subscribe((totalAmount) => {
      const downPaymentControl = this.loanForm.get('downPayment');
      if (totalAmount >= 1000) {
        if (!downPaymentControl?.value || downPaymentControl?.pristine) {
          const downPayment = totalAmount * 0.15;
          downPaymentControl?.setValue(downPayment);
        }
        downPaymentControl?.setValidators([
          Validators.required,
          Validators.min(totalAmount * 0.15),
          Validators.max(totalAmount * 0.9),
        ]);
      } else {
        downPaymentControl?.reset();
      }
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
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
    return this.loanForm.get('totalAmount')!.value || 'auto';
  }
  getTermYearsFloatLabelValue(): FloatLabelType {
    return this.loanForm.get('termYears')!.value || 'auto';
  }

  onLoanFormSubmit() {
    if (this.loanForm.valid) {
      console.log(this.loanForm.value);
      this.loanForm.reset();
    }
  }

  onLoanFormReset() {
    this.loanForm.reset();
  }
}
