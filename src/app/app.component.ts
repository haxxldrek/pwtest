import {Component, OnDestroy, OnInit} from '@angular/core';
import {WidgetService, PaymentMethod} from "./widget.service";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  isLoading: boolean = true;
  subscriptions: Subscription[] = [];
  selectedpaymentMethod: PaymentMethod;
  constructor(private widget: WidgetService){}

  ngOnInit() {
      this.subscriptions.push(
          this.widget.loading.subscribe((status) => {
        this.isLoading = status;
      }),
      this.widget.selectedpaymentMethod.subscribe((method) => {
        this.selectedpaymentMethod = method;
      }));
  }
  ngOnDestroy() {
      this.subscriptions.forEach(s => s.unsubscribe());
  }
}
