import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { ApplicationFormValues } from '../../interfaces/applicationFormValues';
import { ApplicationFormService } from 'src/app/services/application-form-service.service';
import { Router } from '@angular/router';
import { ErrorComponent } from '../../error/error.component';
import { HttpResponse } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  partner: string;
  contractType: string;
  employmentStatus: string;

  constructor(
    private dialogRef: MatDialogRef<PreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApplicationFormValues,
    private applicationFormService: ApplicationFormService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.partner =
      data.financialInformation.coBorrower === 'true' ? 'Yes' : 'No';
    this.contractType =
      data.financialInformation.employmentContractType === 'OPEN_ENDED'
        ? 'Open-ended'
        : 'Fixed-term';
    if (data.financialInformation.employmentStatus === 'CONTRACT_EMPLOYMENT') {
      this.employmentStatus = 'Contract employment';
    } else if (data.financialInformation.employmentStatus === 'SELF_EMPLOYED') {
      this.employmentStatus = 'Self employed';
    } else {
      this.employmentStatus = 'Unemployed';
    }
  }

  onApplicationFormSubmit() {
    this.applicationFormService
      .postFormData(this.data)
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.router.navigate(['submitted']);
        }),
        catchError((error) => {
          const dialogRef = this.dialog.open(ErrorComponent, {
            width: '400px',
            data: { message: 'Error: ' + error.message },
          });
          return of(null);
        })
      )
      .subscribe();
  }
}
