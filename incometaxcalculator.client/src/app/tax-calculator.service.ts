import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxCalculatorService {

  constructor(private http: HttpClient) { }

  calculateTax(grossSalary: number): Observable<any> {
    return this.http.post<any>('http://localhost:5254/api/TaxCalculator/calculate', grossSalary, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
  }
}
