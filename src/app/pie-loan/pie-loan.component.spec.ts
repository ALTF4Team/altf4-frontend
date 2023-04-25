import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieLoanComponent } from './pie-loan.component';

describe('PieLoanComponent', () => {
  let component: PieLoanComponent;
  let fixture: ComponentFixture<PieLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
