import {FormControl} from "@angular/forms";

export function cvvValidator(control: FormControl): { [s: string]: boolean } {
    if(`${control.value}`.toString().length !== 3) {
        return { 'cvvInvalid': true };
    }
    return null;
}