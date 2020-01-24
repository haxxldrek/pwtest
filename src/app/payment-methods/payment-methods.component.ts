import { Component, OnInit } from '@angular/core';
import {ApiService} from "../API/api.service";
import {GeoService} from "../API/geo.service";
import {WidgetService, PaymentMethod} from "../widget.service";

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
  providers: [ApiService, GeoService]
})
export class PaymentMethodsComponent implements OnInit {
  countries: {code: string, name: string}[];
  availableMethods: PaymentMethod[];
  selectedpaymentMethod: PaymentMethod;
  errorGetMethod: string;
  constructor(private wallAPI: ApiService,
              private geo: GeoService,
              private widget: WidgetService) { }

  ngOnInit() {
    this.geo.getUserGeo().subscribe((data) => {
      this.countries = data;
      this.setPaymentMethods(data[0].code);
    })
  }
    onPaymentAmount(amount: number){
        this.widget.selectedpaymentMethod.next({
            ...this.selectedpaymentMethod,
            'amount': (amount > 0) ? amount : 0
        })
    }

    changePaymentMethod(index: number){
        this.widget.selectedpaymentMethod.next(this.availableMethods[index]);
        this.selectedpaymentMethod = this.availableMethods[index];
    }
    onCountryChange(countryCode: string){
        this.setPaymentMethods(countryCode);
    }

    private setPaymentMethods(code: string) {
      this.widget.loading.next(true);
        this.wallAPI.getPaymentMethods(code).subscribe((data) => {
            this.selectedpaymentMethod = data[0];
            this.widget.selectedpaymentMethod.next(data[0]);//for change form component
            this.availableMethods = data;
            this.widget.loading.next(false);
            this.errorGetMethod = null;
        },
         error => {
             this.widget.loading.next(false);
             this.errorGetMethod = error.error.error
         })
    }

}
