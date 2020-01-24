import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './forms/CreditCard/form.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import {DropdownDirective} from "./shared/dropdown.directive";

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PaymentMethodsComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
      HttpClientModule,
      HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
