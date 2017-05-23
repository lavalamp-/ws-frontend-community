import {BaseModel} from "./model-base.class";

export class DomainName extends BaseModel {

  public name: string;
  public uuid: string;
  public is_monitored: boolean;
  public scanning_enabled: boolean;
  public times_scanned: number;
  public last_scan_time: string;

  public static fromObject(toParse: any): any {
    return new DomainName(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(DomainName.fromObject(curParse));
    }
    return toReturn;
  }

  get lastScanDate(): Date {
    if (this.last_scan_time) {
      return new Date(this.last_scan_time);
    } else {
      return null;
    }
  }

  get scanDescription(): string {
    if (this.times_scanned == 0) {
      return 'Never scanned before';
    } else {
      return 'Scanned ' + this.times_scanned + ' times (last scanned on ' + this.lastScanDate.toDateString() + ')';
    }
  }

}
