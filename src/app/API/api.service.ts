import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';
import {Injectable} from "@angular/core";

export interface SendPaymentData {
    cardholderName: string;
    cardNumber: number;
    expDate: {};
    cvv: number;
    amount: number;
}

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) {}

    getPaymentMethods(countryCode: string) {
        return this.http.get<any>(
            `https://api.paymentwall.com/api/payment-systems/?key=${environment.paymentWallAPIKey}&country_code=${countryCode}&sign_version=2&sign=${environment.paymentWallAPISecret}`
        )
    }
    sendPayment(data: SendPaymentData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 1000)
        })
    }

}