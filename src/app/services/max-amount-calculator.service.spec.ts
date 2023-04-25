import { TestBed } from '@angular/core/testing';

import { MaxAmountCalculatorService } from './max-amount-calculator.service';

describe('MaxAmountCalculatorService', () => {
  let service: MaxAmountCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaxAmountCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
