import {FormControl} from "@angular/forms";

export function validateMonth(control: FormControl): { [s: string]: boolean } {
    let month: string = `${control.value}`;
    if(month.length !== 2) {
        return { 'lenghtInvalid': true};
    }
    if(month[0] === '0' && +month[1] <= 9){
        return null;
    }

    if(+month <= 12 && +month >= 1){
        return null;
    }else{
        return {'wrongMonthInvalid': true};
    }

}