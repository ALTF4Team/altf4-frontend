import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
})
export class ApplicationFormComponent {
  applicationForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.applicationForm = this.fb.group({
      customerInformation: this.fb.group({
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        countryOfCitizenship: ['', [Validators.required]],
        yearOfBirth: [
          '',
          [Validators.required, Validators.pattern('^[0-9]*$')],
        ],
        mobileNumber: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
      }),
      loanForm: this.fb.group({
        loanPurpose: ['', [Validators.required]],
        totalAmount: [
          '',
          [
            Validators.required,
            Validators.min(10000),
            Validators.pattern('^[0-9]*$'),
          ],
        ],
        downPayment: [''],
        loanTerm: [
          '',
          [
            Validators.required,
            Validators.min(1),
            Validators.max(30),
            Validators.pattern('^[0-9]*$'),
          ],
        ],
      }),
    });

    ///////////////////////////////////////////////////////

    this.applicationForm
      .get('loanForm')!
      .get('totalAmount')!
      .valueChanges.subscribe((totalAmount) => {
        const downPaymentControl = this.applicationForm
          .get('loanForm')!
          .get('downPayment');
        if (totalAmount >= 1000) {
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

  onApplicationFormSubmit() {
    if (this.applicationForm.valid) {
      console.log(this.applicationForm.value);
    }
  }
  onApplicationFormReset() {
    this.applicationForm.reset();
  }

  get name() {
    return this.applicationForm
      .get('customerInformation')!
      .get('name') as FormControl<string>;
  }

  get surname() {
    return this.applicationForm
      .get('customerInformation')!
      .get('surname') as FormControl<string>;
  }

  get countryOfCitizenship() {
    return this.applicationForm
      .get('customerInformation')!
      .get('countryOfCitizenship') as FormControl<string>;
  }

  get yearOfBirth() {
    return this.applicationForm
      .get('customerInformation')!
      .get('yearOfBirth') as FormControl<number>;
  }

  get mobileNumber() {
    return this.applicationForm
      .get('customerInformation')!
      .get('mobileNumber') as FormControl<string>;
  }

  get email() {
    return this.applicationForm
      .get('customerInformation')!
      .get('email') as FormControl<string>;
  }

  get loanPurpose() {
    return this.applicationForm
      .get('loanForm')!
      .get('loanPurpose') as FormControl<string>;
  }

  get totalAmount() {
    return this.applicationForm
      .get('loanForm')!
      .get('totalAmount') as FormControl<number>;
  }

  get downPayment() {
    return this.applicationForm
      .get('loanForm')!
      .get('downPayment') as FormControl<number>;
  }

  get loanTerm() {
    return this.applicationForm
      .get('loanForm')!
      .get('loanTerm') as FormControl<number>;
  }

  getPersonalInformationFloatLabelValue(): FloatLabelType {
    return this.applicationForm.get('customerInformation')!.value || 'auto';
  }
  getLoanFormFloatLabelValue(): FloatLabelType {
    return this.applicationForm.get('loanForm')!.value || 'auto';
  }
}
