import {BaseModel} from "./model-base.class";

export class Order extends BaseModel {

  public uuid: string;
  public started_at: string;
  public completed_at: string;
  public user_email: string;
  public scoped_domains_count: number;
  public scoped_endpoints_count: number;
  public scoped_endpoints_size: number;
  public has_been_charged: boolean;
  public networks: string[];
  public domain_names: string[];
  public scan_config: string;

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
