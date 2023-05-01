import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { ApplicationFormValues } from '../interfaces/applicationFormValues';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplicationFormService {
  countriesdApiURL: string = 'https://restcountries.com/v3.1/all?fields=name';
  apiURL: string = environment.apiURL + 'api/loan-application';

  constructor(private httpClient: HttpClient) {}

  getCountriesList() {
    return this.httpClient.get<Country[]>(this.countriesdApiURL);
  }

  postFormData(applicationFormParameters: ApplicationFormValues) {
    return this.httpClient.post(this.apiURL, applicationFormParameters, {
      observe: 'response',
    });
  }
}
