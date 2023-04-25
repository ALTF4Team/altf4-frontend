import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoanFormValues } from '../interfaces/loanFormValues';
import { MonthlyInterest } from '../interfaces/monthlyInterest';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterestCalculatorService {
  apiURL: string = environment.apiURL + '/api/loan-calculator';
  constructor(private httpClient: HttpClient) {}

  getMonthlyInterest(loanParameters: LoanFormValues) {
    return this.httpClient.post<MonthlyInterest>(this.apiURL, loanParameters);
  }
}
