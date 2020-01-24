export class CCTypes
{
    public static NONE                     : string = "none";
    public static AMERICAN_EXPRESS         : string = "amex";
    public static DISCOVER                 : string = "disc";
    public static DINERS_CLUB_INTERNATIONAL: string = "dine";
    public static VISA                     : string = "visa";
    public static MASTERCARD               : string = "mast";

    constructor()
    {
        // empty
    }

    public static isAccepted(cardName:string): boolean
    {
        return cardName == this.AMERICAN_EXPRESS          ||
            cardName == this.DISCOVER                  ||
            cardName == this.DINERS_CLUB_INTERNATIONAL ||
            cardName == this.VISA                      ||
            cardName == this.MASTERCARD;
    }
}