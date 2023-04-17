import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ApplicationFormService } from './application-form-service.service';
import { map, Observable, startWith } from 'rxjs';
import { Country } from './country';
import { ApplicationFormValues } from './application-form-values';
import { MatDialog } from '@angular/material/dialog';
import { PreviewComponent } from './preview/preview.component';
import { ValidationService } from './validation.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
})
export class ApplicationFormComponent implements OnInit {
  applicationForm: FormGroup;
  formData!: ApplicationFormValues;
  countries: Country[] = [];
  filteredCountries!: Observable<Country[]>;
  startDate = new Date(1980, 0, 1);
  maxDate: Date;
  percentage!: number;
  isPreviewed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private applicationFormService: ApplicationFormService,
    private validationService: ValidationService,
    public dialog: MatDialog
  ) {
    this.applicationForm = this.fb.group({
      customerInformation: this.fb.group({
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        countryOfCitizenship: ['', [Validators.required]],
        dateOfBirth: ['', [Validators.required]],
        mobileNumber: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
            ),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
      }),
      loanForm: this.fb.group(
        {
          loanPurpose: ['', [Validators.required]],
          totalAmount: [
            '',
            [
              Validators.required,
              Validators.min(10000),
              Validators.pattern('^[0-9]*$'),
            ],
          ],
          downPayment: ['', Validators.required],
          loanTerm: [
            '',
            [
              Validators.required,
              Validators.min(1),
              Validators.max(30),
              Validators.pattern('^[0-9]*$'),
            ],
          ],
        },
        { validators: this.validationService.downPaymentValidator }
      ),
      financialInformation: this.fb.group({
        employmentStatus: ['', Validators.required],
        sourceOfIncome: new FormControl(null, Validators.required),
        yearsSelfEmployment: new FormControl(null, Validators.required),
        currentEmployer: new FormControl(null, Validators.required),
        employmentContractType: new FormControl(null, Validators.required),
        yearsCurrentEmployer: new FormControl(null, Validators.required),
        position: new FormControl(null, Validators.required),
        industry: new FormControl(null, Validators.required),
        education: ['', Validators.required],
        maritalStatus: ['', Validators.required],
        underageDependentsCount: ['', Validators.required],
        monthlyIncome: ['', Validators.required],
        coBorrower: ['', Validators.required],
      }),
    });

    this.maxDate = new Date();
    this.setDownPayment();
    this.setPercentage();
  }

  ngOnInit() {
    this.applicationFormService
      .getCountriesList()
      .subscribe((countriesList: Country[]) => {
        this.countries = countriesList.sort(
          (a, b) => a.name.common.charCodeAt(0) - b.name.common.charCodeAt(0)
        );
      });

    this.filteredCountries = this.countryOfCitizenship.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Country[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter((option) =>
      option.name.common.toLowerCase().includes(filterValue)
    );
  }

  onApplicationFormSubmit() {
    if (this.applicationForm.valid) {
      console.log(this.applicationForm.value);
    }
  }
  onApplicationFormReset() {
    this.applicationForm.reset();
  }

  onPreview() {
    if (this.applicationForm) {
      this.formData = this.applicationForm.value;
      this.openDialog();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(PreviewComponent, {
      data: this.formData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
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

  get dateOfBirth() {
    return this.applicationForm
      .get('customerInformation')!
      .get('dateOfBirth') as FormControl<string | Date>;
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
      .get('sourceOfIncome') as FormControl<string | null>;
  }

  get yearsSelfEmployment() {
    return this.applicationForm
      .get('financialInformation')!
      .get('yearsSelfEmployment') as FormControl<number | null>;
  }

  get currentEmployer() {
    return this.applicationForm
      .get('financialInformation')!
      .get('currentEmployer') as FormControl<string | null>;
  }

  get employmentContractType() {
    return this.applicationForm
      .get('financialInformation')!
      .get('employmentContractType') as FormControl<string | null>;
  }

  get yearsCurrentEmployer() {
    return this.applicationForm
      .get('financialInformation')!
      .get('yearsCurrentEmployer') as FormControl<string | null>;
  }

  get position() {
    return this.applicationForm
      .get('financialInformation')!
      .get('position') as FormControl<string | null>;
  }

  get industry() {
    return this.applicationForm
      .get('financialInformation')!
      .get('industry') as FormControl<string | null>;
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

  get customerInformation() {
    return this.applicationForm.get('customerInformation') as FormControl<any>;
  }

  get loanForm() {
    return this.applicationForm.get('loanForm') as FormControl<any>;
  }

  get financialInformation() {
    return this.applicationForm.get('financialInformation') as FormControl<any>;
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

  setDownPayment(): void {
    this.applicationForm
      .get('loanForm')!
      .get('totalAmount')!
      .valueChanges.subscribe((totalAmount) => {
        const downPaymentControl = this.applicationForm
          .get('loanForm')!
          .get('downPayment');
        if (totalAmount >= 1000) {
          const downPayment = totalAmount * 0.15;
          downPaymentControl?.setValue(Math.round(downPayment));
        } else {
          downPaymentControl?.reset();
        }
      });
  }

  setPercentage(): void {
    this.applicationForm
      .get('loanForm')!
      .get('downPayment')!
      .valueChanges.subscribe((downPayment) => {
        const downPaymentControl = this.applicationForm
          .get('loanForm')!
          .get('downPayment');
        const totalAmount = this.applicationForm
          .get('loanForm')
          ?.get('totalAmount');
        if (downPaymentControl && totalAmount?.value > 0) {
          this.percentage = Math.round(
            (downPaymentControl.value * 100) / totalAmount?.value
          );
        }
      });
  }
}
