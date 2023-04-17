import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country';

@Injectable({
  providedIn: 'root',
})
export class ApplicationFormService {
  apiURL: string = 'https://restcountries.com/v3.1/all?fields=name';
  constructor(private httpClient: HttpClient) {}

  getCountriesList() {
    return this.httpClient.get<Country[]>(this.apiURL);
  }
}
