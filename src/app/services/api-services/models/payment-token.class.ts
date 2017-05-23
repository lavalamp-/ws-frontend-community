import {BaseModel} from "./model-base.class";

export class PaymentToken extends BaseModel {

  public uuid: string;
  public name: string;
  public token_type: string;
  public token_value: string;
  public card_type: string;
  public expiration_month: number;
  public expiration_year: number;
  public card_last_four: string;
  public can_be_charged: boolean;

  public static fromObject(toParse: any): any {
    return new PaymentToken(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(PaymentToken.fromObject(curParse));
    }
    return toReturn;
  }

  get description(): string {
    return '****-****-****-' + this.card_last_four + ' (expires ' + this.expiration_month + '/' + this.expiration_year + ')';
  }

  get nameDescription(): string {
    if (this.name) {
      return this.name;
    } else {
      return 'No Name Provided';
    }
  }

}
