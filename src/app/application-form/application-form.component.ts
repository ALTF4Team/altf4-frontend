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
      financialInformation: this.fb.group({
        employmentStatus: ['', Validators.required],
        sourceOfIncome: ['', Validators.required],
        yearsSelfEmployment: ['', Validators.required],
        currentEmployer: ['', Validators.required],
        employmentContractType: ['', Validators.required],
        yearsCurrentEmployer: ['', Validators.required],
        position: ['', Validators.required],
        industry: ['', Validators.required],
        education: ['', Validators.required],
        maritalStatus: ['', Validators.required],
        underageDependentsCount: ['', Validators.required],
        monthlyIncome: ['', Validators.required],
        coBorrower: ['', Validators.required],
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

  get employmentStatus() {
    return this.applicationForm
      .get('financialInformation')!
      .get('employmentStatus') as FormControl<string>;
  }

  get sourceOfIncome() {
    return this.applicationForm
      .get('financialInformation')!
      .get('sourceOfIncome') as FormControl<string>;
  }

  get yearsSelfEmployment() {
    return this.applicationForm
      .get('financialInformation')!
      .get(' yearsSelfEmployment') as FormControl<number>;
  }

  get currentEmployer() {
    return this.applicationForm
      .get('financialInformation')!
      .get('currentEmployer') as FormControl<string>;
  }

  get employmentContractType() {
    return this.applicationForm
      .get('financialInformation')!
      .get('employmentContractType') as FormControl<string>;
  }

  get yearsCurrentEmployer() {
    return this.applicationForm
      .get('financialInformation')!
      .get('yearsCurrentEmployer') as FormControl<string>;
  }

  get position() {
    return this.applicationForm
      .get('financialInformation')!
      .get('position') as FormControl<string>;
  }

  get industry() {
    return this.applicationForm
      .get('financialInformation')!
      .get('industry') as FormControl<string>;
  }

  get education() {
    return this.applicationForm
      .get('financialInformation')!
      .get('industry') as FormControl<string>;
  }

  get maritalStatus() {
    return this.applicationForm
      .get('financialInformation')!
      .get('maritalStatus') as FormControl<string>;
  }

  get underageDependentsCount() {
    return this.applicationForm
      .get('financialInformation')!
      .get('underageDependentsCount') as FormControl<string>;
  }

  get monthlyIncome() {
    return this.applicationForm
      .get('financialInformation')!
      .get('monthlyIncome') as FormControl<string>;
  }

  get coBorrower() {
    return this.applicationForm
      .get('financialInformation')!
      .get('monthlyIncome') as FormControl<string>;
  }

  getPersonalInformationFloatLabelValue(): FloatLabelType {
    return this.applicationForm.get('customerInformation')!.value || 'auto';
  }
  getLoanFormFloatLabelValue(): FloatLabelType {
    return this.applicationForm.get('loanForm')!.value || 'auto';
  }
  getFinancialInformationFloatLabelValue(): FloatLabelType {
    return this.applicationForm.get('financialInformation')!.value || 'auto';
  }
}
