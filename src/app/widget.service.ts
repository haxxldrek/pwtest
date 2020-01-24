import {Injectable} from "@angular/core";
import {Subject} from "rxjs/internal/Subject";
export interface PaymentMethod {
    img_url: string;
    name: string;
    id: string;
    amount?: number;
}
@Injectable({providedIn: 'root'})
export class WidgetService {
    loading = new Subject<boolean>();
    selectedpaymentMethod = new Subject<PaymentMethod>();
}