import { TestBed } from '@angular/core/testing';

import { ApplicationFormService } from './application-form-service.service';

describe('ApplicationFormServiceService', () => {
  let service: ApplicationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
