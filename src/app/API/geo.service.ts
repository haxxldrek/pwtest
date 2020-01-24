import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";


interface GeoResponse {
    country_name: string;
    country_code: string;
    currency?: {}
}
@Injectable()
export class GeoService {
    countryList = [
        {
            'code': 'UA',
            'name': 'Ukraine'
        },
        {
            'code': 'UK',
            'name': 'England'
        },
        {
            'code': 'DE',
            'name': 'Germany'
        }
    ];
    constructor(private http: HttpClient) {}

    getUserGeo(){
        return this.http.get<GeoResponse>(
            'http://api.ipstack.com/check?access_key=' + environment.geoApi
        )
        .pipe(
            map((data) => {
                return [
                    {code: data.country_code, name: data.country_name},
                    ...this.countryList
                ].filter((elem, index, self) => self.findIndex(
                    (t) => {return (t.code === elem.code)}) === index);
                }
            )
        )
    }
}