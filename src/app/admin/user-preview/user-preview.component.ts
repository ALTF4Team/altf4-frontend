import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UserApplicationValues } from 'src/app/interfaces/userApplicationValues';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.scss'],
})
export class UserPreviewComponent {
  partner: string;

  constructor(
    private adminService: AdminService,
    private dialogRef: MatDialogRef<UserPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserApplicationValues
  ) {
    this.partner =
      data.financialInformation.coBorrowed === 'true' ? 'Yes' : 'No';
  }

  approve(data: UserApplicationValues) {
    data.applicationStatus = 'approved';
    this.adminService.updateApplicationStatus(data).subscribe();
  }

  deny(data: UserApplicationValues) {
    data.applicationStatus = 'denied';
    this.adminService.updateApplicationStatus(data).subscribe();
  }
}
