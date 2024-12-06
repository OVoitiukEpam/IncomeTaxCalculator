import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TaxCalculatorService } from '../tax-calculator.service';


@Component({
  selector: 'app-tax-calculator',
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.css'],
  standalone: true
})
export class TaxCalculatorComponent {
  grossSalaryControl = new FormControl('', [Validators.required, Validators.min(0)]);
  results: any = null;

  constructor(private taxCalculatorService: TaxCalculatorService) { }

  calculateTax() {
    if (this.grossSalaryControl.invalid) return;
    const grossAnnualSalary = Number(this.grossSalaryControl.value) || 0;  
    this.taxCalculatorService.calculateTax(grossAnnualSalary).subscribe({
      next: (data) => this.results = data,
      error: (err) => console.error('Error calculating tax:', err)
    });
  }
}
