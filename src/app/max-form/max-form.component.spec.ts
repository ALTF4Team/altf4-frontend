import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxFormComponent } from './max-form.component';

describe('MaxFormComponent', () => {
  let component: MaxFormComponent;
  let fixture: ComponentFixture<MaxFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
