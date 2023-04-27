import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { UserApplicationValues } from '../interfaces/userApplicationValues';
import { MatTableDataSource } from '@angular/material/table';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatDialog } from '@angular/material/dialog';
import { UserPreviewComponent } from './user-preview/user-preview.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  displayedColumns: string[] = [
    'position',
    'name',
    'surname',
    'status',
    'preview',
  ];
  formData!: UserApplicationValues;
  applicationList$?: Observable<UserApplicationValues[]>;
  dataSource: CdkTableDataSourceInput<UserApplicationValues> =
    new MatTableDataSource();

  constructor(private adminService: AdminService, private dialog: MatDialog) {
    this.applicationList$ = adminService.getApplicationsList();
    this.applicationList$.subscribe(
      (data) => (this.dataSource = data),
      (error) => console.error(error)
    );
  }

  onPreview(application: UserApplicationValues) {
    this.formData = application;
    console.log(this.formData);
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserPreviewComponent, {
      data: this.formData,
      height: '900px',
      width: '700px',
      panelClass: 'preview_container',
    });
    dialogRef.afterClosed().subscribe((result) => {
      dialogRef.close();
    });
  }

  sortByStatus() {
    this.applicationList$?.subscribe((items) => {
      this.dataSource = items.sort((a, b) =>
        a.applicationStatus.localeCompare(b.applicationStatus)
      );
    });
  }

  sortByID() {
    this.applicationList$?.subscribe((items) => {
      this.dataSource = items.sort((a, b) => a.id - b.id);
    });
  }

  sortBySurname() {
    this.applicationList$?.subscribe((items) => {
      this.dataSource = items.sort((a, b) =>
        a.customer.surname.localeCompare(b.customer.surname)
      );
    });
  }
}
