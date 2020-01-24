import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CCValidator} from "../validators/cc.validator";
import {nameValidator} from "../validators/name.validator";
import {validateMonth} from "../validators/expMonth.validator";
import {expDateValidity} from "../validators/expDate.validator";
import {validateYear} from "../validators/expYear.validator";
import {cvvValidator} from "../validators/cvv.validator";
export class FormsService {
    forms: {} = {
        'test': new FormGroup({
            'cardholderName': new FormControl(null, [Validators.required, nameValidator]),
            'cardNumber': new FormControl(null, [Validators.required, CCValidator.isValid.bind(CCValidator)]),
            'expDate': new FormGroup({
                'expMonth': new FormControl('01', [Validators.required, validateMonth]),
                'expYear': new FormControl(new Date().getFullYear().toString().substr(2, 2), [Validators.required, Validators.maxLength(2), validateYear] )
            }, expDateValidity),
            'cvv': new FormControl(null, [Validators.required, cvvValidator]),
        })
    }
}