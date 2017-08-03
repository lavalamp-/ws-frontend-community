import {BaseModel} from "../model-base.class";
import {DataPoint} from "./data-point.interface";

export class DomainNameReportAnalytics extends BaseModel {

  public has_resolutions: DataPoint[];
  public related_ips: DataPoint[];
  public resolutions_type: DataPoint[];
  public domain_added_by: DataPoint[];

  public static fromObject(toParse: any): any {
    return new DomainNameReportAnalytics(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(DomainNameReportAnalytics.fromObject(curParse));
    }
    return toReturn;
  }

}
