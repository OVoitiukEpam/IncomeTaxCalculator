import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SalaryInputComponent } from './salary-input/salary-input.component';
import { SalaryResultComponent } from './salary-result/salary-result.component';

@NgModule({
  declarations: [
    AppComponent,
    SalaryInputComponent,
    SalaryResultComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule, // Add this line
    MatInputModule, // Add other Angular Material modules here
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    LayoutModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
