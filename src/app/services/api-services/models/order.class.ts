import {BaseModel} from "./model-base.class";

export class Order extends BaseModel {

  public uuid: string;
  public started_at: string;
  public completed_at: string;
  public user_email: string;
  public order_tier_name: string;
  public order_tier_price: number;
  public scoped_domains_count: number;
  public scoped_endpoints_count: number;
  public scoped_endpoints_size: number;
  public price_currency: string;
  public order_cost: number;
  public charge_amount: number;
  public transaction_id: string;
  public has_been_charged: boolean;
  public charged_at: string;
  public networks: string[];
  public domain_names: string[];
  public payment_last_four: string;
  public payment_exp_month: number;
  public payment_exp_year: number;

  public static fromObject(toParse: any): any {
    return new Order(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(Order.fromObject(curParse));
    }
    return toReturn;
  }

}
