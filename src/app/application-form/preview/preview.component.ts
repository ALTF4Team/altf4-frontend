import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationFormValues } from '../../interfaces/applicationFormValues';
import { ApplicationFormService } from 'src/app/services/application-form-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  partner: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ApplicationFormValues,
    private applicationFormService: ApplicationFormService,
    private router: Router
  ) {
    this.partner =
      data.financialInformation.coBorrower === 'true' ? 'Yes' : 'No';
  }

  onApplicationFormSubmit() {
    console.log(this.data);
    this.applicationFormService.postFormData(this.data).subscribe((res) => {
      console.log(res);
      this.router.navigate(['submitted']);
    });
  }
}
