import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryInputComponent } from './salary-input.component';

describe('SalaryInputComponent', () => {
  let component: SalaryInputComponent;
  let fixture: ComponentFixture<SalaryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaryInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
