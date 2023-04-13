import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {FloatLabelType} from '@angular/material/form-field';
import {InterestCalculatorService} from "../services/interest-calculator.service";
import {MonthlyInterest} from "../interfaces/monthlyInterest";

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss'],
})
export class LoanFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  loanForm: FormGroup;

  monthlyInterest$?: Observable<MonthlyInterest>

  constructor(private fb: FormBuilder, private interestService: InterestCalculatorService) {
    this.loanForm = this.fb.group({
      loanSize: ['', [Validators.required, Validators.min(10000), Validators.pattern("^[0-9]*$")]],
      downPayment: ['', [Validators.required]],
      loanTermYears: [
        '',
        [Validators.required, Validators.min(1), Validators.max(30), Validators.pattern("^[0-9]*$")],
      ],
    });

    this.loanForm.get('loanSize')!.valueChanges.subscribe((totalAmount) => {
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
          Validators.pattern("^[0-9]*$")
        ]);
      } else {
        downPaymentControl?.reset();
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  get loanSize() {
    return this.loanForm.get('loanSize') as FormControl<number>;
  }

  get downPayment() {
    return this.loanForm.get('downPayment') as FormControl<number>;
  }

  get loanTermYears() {
    return this.loanForm.get('loanTermYears') as FormControl<number>;
  }

  getTotalAmountFloatLabelValue(): FloatLabelType {
    return this.loanForm.get('loanSize')!.value || 'auto';
  }

  getDownPaymentFloatLabelValue(): FloatLabelType {
    return this.loanForm.get('downPayment')!.value || 'auto';
  }

  getTermYearsFloatLabelValue(): FloatLabelType {
    return this.loanForm.get('loanTermYears')!.value || 'auto';
  }

  onLoanFormSubmit() {
    if (this.loanForm.valid) {
      this.interestService.getMonthlyInterest(this.loanForm.value).subscribe(value => console.log(value));

      this.loanForm.reset();
    }
  }

  onLoanFormReset() {
    this.loanForm.reset();
  }
}
