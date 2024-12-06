import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TaxResponse } from './tax-calculator.service'; 

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'salary-calculator';
  result: TaxResponse | null = null; // Define the result property

  setResult(calculatedResult: TaxResponse) {
    this.result = calculatedResult; // Method to set the result
  }
}