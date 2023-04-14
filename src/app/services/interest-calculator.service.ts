import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoanFormValues} from "../interfaces/loanFormValues";
import {MonthlyInterest} from "../interfaces/monthlyInterest";

@Injectable({
  providedIn: 'root'
})
export class InterestCalculatorService {
  apiURL: string  = "http://localhost:8080/api/loan-calculator"
  constructor(private httpClient: HttpClient) { }

  getMonthlyInterest(loanParameters: LoanFormValues){
    return this.httpClient.post<MonthlyInterest>(this.apiURL, loanParameters);
  }
}
