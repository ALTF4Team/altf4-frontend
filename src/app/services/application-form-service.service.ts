import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { ApplicationFormValues } from '../interfaces/applicationFormValues';

@Injectable({
  providedIn: 'root',
})
export class ApplicationFormService {
  countriesdApiURL: string = 'https://restcountries.com/v3.1/all?fields=name';
  apiURL: string = 'https://alt-f4-backend.onrender.com/api/loan-application';

  constructor(private httpClient: HttpClient) {}

  getCountriesList() {
    return this.httpClient.get<Country[]>(this.countriesdApiURL);
  }

  postFormData(applicationFormParameters: ApplicationFormValues) {
    console.log('posting...');
    return this.httpClient.post(this.apiURL, applicationFormParameters);
  }

  // getMaxAmounts(maxAmountParameters: MaxFormValues) {
  //   // return this.httpClient.post<MaxAmounts>(this.apiURL, maxAmountParameters);
  // }
}
