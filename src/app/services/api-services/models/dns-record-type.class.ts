import {BaseModel} from "./model-base.class";

export class DnsRecordType extends BaseModel {

  public record_type: string;

  public static fromObject(toParse: any): any {
    return new DnsRecordType(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(DnsRecordType.fromObject(curParse));
    }
    return toReturn;
  }

}
