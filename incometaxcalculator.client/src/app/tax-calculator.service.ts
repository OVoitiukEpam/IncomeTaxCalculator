import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment'; // Import the environment settings

export interface TaxResponse {
  grossSalary: number;
  tax: number;
  netSalary: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaxCalculatorService {
  private baseUrl = environment.apiUrl; // Use the API URL from the environment

  constructor(private http: HttpClient) { }

  calculateTax(grossSalary: number): Observable<TaxResponse> {

    return this.http.post<TaxResponse>(this.baseUrl, grossSalary, {
      headers: {
        'Content-Type': 'application/json' // Ensure to set Content-Type header
      }
    }).pipe(
      delay(1000), // Emulate a delay for processing
      catchError(error => {
        console.error('Error calculating tax', error);
        // Return a default value in case of error
        return of({ grossSalary: 0, tax: 0, netSalary: 0 } as TaxResponse);
      })
    );
  }
}
