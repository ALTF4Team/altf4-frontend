import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaxFormValues } from '../interfaces/maxFormValues';
import { MaxAmounts } from '../interfaces/maxAmounts';

@Injectable({
  providedIn: 'root',
})
export class MaxAmountCalculatorService {
  // apiURL: string;

  constructor(private httpClient: HttpClient) {}
  getMaxAmounts(maxAmountParameters: MaxFormValues) {
    // return this.httpClient.post<MaxAmounts>(this.apiURL, maxAmountParameters);
  }
}
