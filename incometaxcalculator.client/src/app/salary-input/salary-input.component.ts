import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxCalculatorService, TaxResponse } from '../tax-calculator.service';

@Component({
  selector: 'app-salary-input',
  templateUrl: './salary-input.component.html',
  standalone: false,
  styleUrls: ['./salary-input.component.css']
})
export class SalaryInputComponent {
  salaryForm: FormGroup;
  isProcessing = false;
  
  @Output() resultChange = new EventEmitter<TaxResponse>(); // Define output property

  constructor(private fb: FormBuilder, private taxService: TaxCalculatorService) {
    this.salaryForm = this.fb.group({
      grossSalary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  calculate() {
    if (this.salaryForm.valid) {
      this.isProcessing = true;
      const salary = this.salaryForm.get('grossSalary')?.value;

      this.taxService.calculateTax(salary).subscribe(response => {
        this.isProcessing = false;
        this.resultChange.emit(response); // Emit the result
      });
    }
  }
  
  get grossSalary() {
    return this.salaryForm.get('grossSalary');
  }
}