import {FormGroup} from "@angular/forms";

export function expDateValidity(group: FormGroup): { [s: string]: boolean } {
    const m = group.get('expMonth').value;
    const y = group.get('expYear').value;

    if( m < 1 || m > 12 ){
        return {'expDateInvalid': true};
    }

    if( y < 0 || y > 99 ){
        return {'expDateInvalid': true};
    }

    const date: Date       = new Date();
    const curMonth: number = date.getMonth();
    const curYear: number  = +date.getFullYear().toString().substr(2, 2) ;

    if( y < curYear ){
        return {'expDateInvalid': true};
    }
    else if( y == curYear ){
        return (m >= curMonth) ? null : {'expDateInvalid': true};
    }
    else{
        return null;
    }
}