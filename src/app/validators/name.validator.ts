import { FormControl } from '@angular/forms';


export function nameValidator( control: FormControl ): { [s: string]: boolean }
{
    if( `${control.value}`.length > 0 )
    {
        const cardHolderName = `${control.value}`;
        const validate = /^([A-Za-z]{2,})\s([A-Za-z]{2,})$/;
        let isValid = validate.test(cardHolderName);
        if (cardHolderName.length < 3) {
            return { 'lengthInvalid': true };
        }
        if(isValid){
            return null;
        }else{
            return { 'invalidName': true };
        }
    }
}