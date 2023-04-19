import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationFormValues } from '../application-form-values';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  dob: string;
  partner: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ApplicationFormValues) {
    data.financialInformation.sourceOfIncome?.toUpperCase;
    this.dob = data.customerInformation.dateOfBirth.toLocaleDateString('lt-LT');
    if (data.financialInformation.coBorrower === 'true') {
      this.partner = 'Yes';
    } else {
      this.partner = 'No';
    }
  }

  onSubmit() {}
}
