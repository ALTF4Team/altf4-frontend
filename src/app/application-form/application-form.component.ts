import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
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
import { ErrorStateMatcher } from '@angular/material/core';

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.dirty && form?.invalid);
  }
}

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
  isPreviewed: boolean = true;
  matcher = new CrossFieldErrorMatcher();

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
          percentage: [''],
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
    this.setDownPaymentOnTotalAmountChange();
    this.setDownPaymentOnPercentageChange();
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
      height: '900px',
      width: '700px',
      panelClass: 'preview_container',
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

  get customerInformation() {
    return this.applicationForm.get('customerInformation') as FormControl<any>;
  }

  get loanForm() {
    return this.applicationForm.get('loanForm') as FormGroup<any>;
  }

  get financialInformation() {
    return this.applicationForm.get('financialInformation') as FormControl<any>;
  }

  get surname() {
    return this.customerInformation.get('surname') as FormControl<string>;
  }

  get countryOfCitizenship() {
    return this.customerInformation.get(
      'countryOfCitizenship'
    ) as FormControl<string>;
  }

  get dateOfBirth() {
    return this.customerInformation.get('dateOfBirth') as FormControl<
      string | Date
    >;
  }

  get mobileNumber() {
    return this.customerInformation.get('mobileNumber') as FormControl<string>;
  }

  get email() {
    return this.customerInformation.get('email') as FormControl<string>;
  }

  get loanPurpose() {
    return this.loanForm.get('loanPurpose') as FormControl<string>;
  }

  get totalAmount() {
    return this.loanForm.get('totalAmount') as FormControl<number>;
  }

  get downPayment() {
    return this.loanForm.get('downPayment') as FormControl<number>;
  }

  get percentage() {
    return this.loanForm.get('percentage') as FormControl<number>;
  }

  get loanTerm() {
    return this.loanForm.get('loanTerm') as FormControl<number>;
  }

  get employmentStatus() {
    return this.financialInformation.get(
      'employmentStatus'
    ) as FormControl<string>;
  }

  get sourceOfIncome() {
    return this.financialInformation.get('sourceOfIncome') as FormControl<
      string | null
    >;
  }

  get yearsSelfEmployment() {
    return this.financialInformation.get('yearsSelfEmployment') as FormControl<
      number | null
    >;
  }

  get currentEmployer() {
    return this.financialInformation.get('currentEmployer') as FormControl<
      string | null
    >;
  }

  get employmentContractType() {
    return this.financialInformation.get(
      'employmentContractType'
    ) as FormControl<string | null>;
  }

  get yearsCurrentEmployer() {
    return this.financialInformation.get('yearsCurrentEmployer') as FormControl<
      string | null
    >;
  }

  get position() {
    return this.financialInformation.get('position') as FormControl<
      string | null
    >;
  }

  get industry() {
    return this.financialInformation.get('industry') as FormControl<
      string | null
    >;
  }

  get education() {
    return this.financialInformation.get('industry') as FormControl<string>;
  }

  get maritalStatus() {
    return this.applicationForm
      .get('financialInformation')!
      .get('maritalStatus') as FormControl<string>;
  }

  get underageDependentsCount() {
    return this.financialInformation.get(
      'underageDependentsCount'
    ) as FormControl<string>;
  }

  get monthlyIncome() {
    return this.financialInformation.get(
      'monthlyIncome'
    ) as FormControl<string>;
  }

  get coBorrower() {
    return this.financialInformation.get(
      'monthlyIncome'
    ) as FormControl<string>;
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

  setDownPaymentOnTotalAmountChange(): void {
    const downPaymentControl = this.downPayment;
    this.totalAmount.valueChanges.subscribe((totalAmount) => {
      if (totalAmount >= 1000) {
        if (!downPaymentControl?.value || downPaymentControl?.pristine) {
          const downPayment = totalAmount * 0.15;
          downPaymentControl?.setValue(downPayment);
        }
      } else {
        downPaymentControl?.reset();
      }
    });
  }

  setDownPaymentOnPercentageChange(): void {
    const downPaymentControl = this.downPayment;
    const totalAmountControl = this.totalAmount;
    this.percentage.valueChanges.subscribe((percentage) => {
      if (percentage >= 0) {
        const downPayment = totalAmountControl.value * (percentage / 100);
        downPaymentControl?.setValue(Math.round(downPayment), {
          emitEvent: false,
        });
      }
    });
  }

  setPercentage(): void {
    this.downPayment.valueChanges.subscribe((downPayment) => {
      const percentageControl = this.percentage;
      const downPaymentControl = this.downPayment;
      const totalAmountControl = this.totalAmount;
      if (totalAmountControl?.value >= 0) {
        percentageControl.setValue(
          Math.round(
            (downPaymentControl.value * 100) / totalAmountControl?.value
          ),
          { emitEvent: false }
        );
      }
    });
  }
}
