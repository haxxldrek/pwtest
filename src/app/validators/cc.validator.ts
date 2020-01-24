import { CCTypes } from './CCTypes';
import {FormControl} from "@angular/forms";

export class CCValidator
{
    public static MIN_LENGTH: number = 14;

    private static _types: { [key: string]: Object } =
        {
            "Amex" : { pattern: /^3[47]/, length: 15 }
            , "Disc" : { pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/, length: 16 }
            , "Dine" : { pattern: /^36/, length: 14 }
            , "Visa" : { pattern: /^4/, length: 16 }
            , "MasterCard" : { pattern: /^5[1-5]/, length: 16 }
        }

    constructor()
    {
    }

    public static getCardType(cardNumber: string): string
    {
        var key: string;
        var cardProps: Object;
        var theCard: string = this.__preprocess(cardNumber);

        for (key in this._types)
        {
            cardProps = this._types[key];

            if( theCard.match(cardProps['pattern']) )
                return key;
        }

        return "none";
    }

    // public static isValid(cardNumber: string): boolean
    public static isValid(control: FormControl): { [s: string]: boolean }
    {
        if(!control.value) return null;
        let cardVal =`${control.value}`

        var testNumber: string = this.__preprocess(cardVal);
        var cardType: string   = this.getCardType(testNumber);

        if( cardType != CCTypes.NONE ){
            if(this.__lengthValid(testNumber, cardType) && this.__luhnValid(testNumber)){
                return null;
            }
            return {'ccInvalid': true}
        }

        return {'ccInvalid': true}
    }

    private static __preprocess(cardNumber: string): string
    {
        return cardNumber.replace(/[ -]/g, '');
    }

    private static __lengthValid(cardNumber: string, cardType: string): boolean
    {
        var cardProps: Object = this._types[cardType];
        return cardProps ? cardNumber.length == cardProps['length'] : false;
    }

    // check the credit card number with the Luhn algorithm
    private static __luhnValid(cardNumber: string): boolean
    {
        var digit: number;
        var n: number;
        var sum: number;
        var j: number;

        sum = 0;
        var numbers:Array<number> = cardNumber.split('').reverse().map( (val) => parseFloat(val) );
        var len: number           = numbers.length;
        n = 0;
        j = 0;

        while( j < len )
        {
            digit = numbers[n];
            digit = +digit;

            if( n % 2 )
            {
                digit *= 2;
                if( digit < 10 )
                    sum += digit;
                else
                    sum += digit - 9;
            }
            else
                sum += digit;

            n = ++j;
        }

        return sum % 10 === 0;
    }
}