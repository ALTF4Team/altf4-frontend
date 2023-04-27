import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserApplicationValues } from '../interfaces/userApplicationValues';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiURL: string = environment.apiURL + 'api/admin/applications';
  updateApiURL: string =
    environment.apiURL +
    'api/admin/application/{id}?status={pending/approved/denied}';

  constructor(private httpClient: HttpClient) {}

  getApplicationsList() {
    return this.httpClient.get<UserApplicationValues[]>(this.apiURL);
  }

  updateApplicationStatus(updatedApplicationValues: UserApplicationValues) {
    return this.httpClient.put<UserApplicationValues>(
      environment.apiURL +
        `api/admin/applications/${updatedApplicationValues.id}?status=${updatedApplicationValues.applicationStatus}`,
      updatedApplicationValues
    );
  }
}
