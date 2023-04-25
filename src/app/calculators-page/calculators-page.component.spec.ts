import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorsPageComponent } from './calculators-page.component';

describe('CalculatorsPageComponent', () => {
  let component: CalculatorsPageComponent;
  let fixture: ComponentFixture<CalculatorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
