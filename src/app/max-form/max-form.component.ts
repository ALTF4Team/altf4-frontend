import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MaxFormValues } from '../interfaces/maxFormValues';
import { Observable } from 'rxjs';
import { MaxAmounts } from '../interfaces/maxAmounts';
import { MaxAmountCalculatorService } from '../services/max-amount-calculator.service';

@Component({
  selector: 'app-max-form',
  templateUrl: './max-form.component.html',
  styleUrls: ['./max-form.component.scss'],
})
export class MaxFormComponent {
  maxForm: FormGroup;
  savedData?: MaxFormValues;
  maxAmounts$?: Observable<MaxAmounts>;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private maxAmountService: MaxAmountCalculatorService
  ) {
    this.maxForm = this.fb.group({
      monthlyIncomeAfterTaxes: ['', [Validators.required, Validators.min(0)]],
      existingLiabilities: ['', [Validators.required, Validators.min(0)]],
      noOfDependents: ['', [Validators.required]],
    });
  }

  onMaxFormSubmit() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      if (this.maxForm.valid) {
        this.savedData = this.maxForm.value;
        this.maxAmounts$ = this.maxAmountService.getMaxAmounts(
          this.maxForm.value
        );
      }
    }, 1500);
  }

  onMaxFormReset() {
    this.maxForm.reset();
  }

  get monthlyIncomeAfterTaxes() {
    return this.maxForm.get('monthlyIncomeAfterTaxes') as FormControl<number>;
  }
  get existingLiabilities() {
    return this.maxForm.get('existingLiabilities') as FormControl<number>;
  }
  get noOfDependents() {
    return this.maxForm.get('noOfDependents') as FormControl<number>;
  }

  getMaxFormFloatLabelValue(): FloatLabelType {
    return this.maxForm.value || 'auto';
  }
}
