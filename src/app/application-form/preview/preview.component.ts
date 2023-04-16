import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationFormValues } from '../application-form-values';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ApplicationFormValues) {}
}
