import { TestBed } from '@angular/core/testing';

import { InterestCalculatorService } from './interest-calculator.service';

describe('InterestCalculatorService', () => {
  let service: InterestCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
