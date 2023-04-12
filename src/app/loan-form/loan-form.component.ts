import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent {

  loanForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.loanForm=this.fb.group({
      totalAmount:[''],
      downPayment:[''],
      termYears:['']
    })
  }


}
