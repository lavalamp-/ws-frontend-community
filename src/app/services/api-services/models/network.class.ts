import {BaseModel} from "./model-base.class";

export class Network extends BaseModel {

  public uuid: string;
  public address: string;
  public mask_length: number;
  public name: string;
  public scanning_enabled: boolean;
  public organization_id: string;
  public cidr_range: string;
  public times_scanned: number;
  public last_scan_time: string;

  public static fromObject(toParse: any): any {
    return new Network(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(Network.fromObject(curParse));
    }
    return toReturn;
  }

  get endpointsCount(): number {
    return Math.pow(2, 32 - this.mask_length);
  }

  get endpointsCountDescription(): string {
    return this.endpointsCount + ' endpoints';
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
