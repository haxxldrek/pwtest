import {FormControl} from "@angular/forms";

export function validateYear(control: FormControl): { [s: string]: boolean } {
    const currYear = new Date().getFullYear().toString();
    if(currYear.substr(2, 2) > control.value || control.value.toString().length != 2) {
        return { 'yearInvalid': true };
    }
    return null;
}