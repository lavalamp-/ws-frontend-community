import {BaseModel} from "./model-base.class";

export class ScanPort extends BaseModel {

  public port_number: number;
  public protocol: string;
  public added_by: string;
  public included: boolean;

  public static fromObject(toParse: any): any {
    return new ScanPort(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(ScanPort.fromObject(curParse));
    }
    return toReturn;
  }

  get description(): string {
    return this.port_number.toString() + ' (' + this.protocol + ')';
  }

}
