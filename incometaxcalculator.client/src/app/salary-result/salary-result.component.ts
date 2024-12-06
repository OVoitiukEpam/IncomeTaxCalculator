import { Component, Input } from '@angular/core';
import { TaxResponse } from '../tax-calculator.service';

@Component({
  selector: 'app-salary-result',
  templateUrl: './salary-result.component.html',
  standalone: false,
  styleUrls: ['./salary-result.component.css']
})
export class SalaryResultComponent {
  @Input() result: TaxResponse | null = null;

  getFormattedResult() {
    if (!this.result) {
      return '';
    }

    const grossAnnualSalary = this.result.grossSalary;
    const netAnnualSalary = this.result.netSalary;
    const taxPaid = this.result.tax;

    // Calculate monthly figures
    const grossMonthlySalary = (grossAnnualSalary / 12).toFixed(2);
    const netMonthlySalary = (netAnnualSalary / 12).toFixed(2);
    const monthlyTaxPaid = (taxPaid / 12).toFixed(2);

    return `
      Gross Annual Salary: £ ${grossAnnualSalary.toFixed(2)}
      Gross Monthly Salary: £ ${grossMonthlySalary}
      Net Annual Salary: £ ${netAnnualSalary.toFixed(2)}
      Net Monthly Salary: £ ${netMonthlySalary}
      Annual Tax Paid: £ ${taxPaid.toFixed(2)}
      Monthly Tax Paid: £ ${monthlyTaxPaid}
    `;
  }
}