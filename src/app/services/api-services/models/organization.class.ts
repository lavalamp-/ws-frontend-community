import {BaseModel} from "./model-base.class";

export class Organization extends BaseModel {

  public uuid: string;
  public name: string;
  public description: string;
  public monitored_service_count: number;
  public unmonitored_service_count: number;
  public service_count: number;
  public scanning_status: number;
  public monitored_networks_count: number;
  public monitored_networks_size: number;
  public ready_for_scan: boolean;
  public last_scan_time: any;
  public networks_count: number;
  public networks_size: number;
  public domains_count: number;
  public monitored_domains_count: number;
  public current_order_tier_name: string;
  public current_order_price: number;

  public static fromObject(toParse: any): any {
    return new Organization(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(Organization.fromObject(curParse));
    }
    return toReturn;
  }

  get domainsDescription(): string {
    if (this.domains_count == 0) {
      return 'No domain names defined';
    } else {
      return this.domains_count + ' domain names';
    }
  }

  get lastScanDate(): Date {
    if (this.last_scan_time) {
      return new Date(this.last_scan_time);
    } else {
      return null;
    }
  }

  get lastScanDescription(): string {
    if (!this.last_scan_time) {
      return 'Never scanned before';
    } else {
      return 'Last scanned ' + this.timeSinceScan;
    }
  }

  get monitoredDomainsDescription(): string {
    if (this.monitored_domains_count == 0) {
      return 'No domains selected for scanning';
    } else {
      return this.monitored_domains_count + ' domain names';
    }
  }

  get monitoredNetworksDescription(): string {
    if (this.monitored_networks_count == 0) {
      return 'No networks selected for scanning';
    } else {
      return this.monitored_networks_count + ' networks containing ' + this.monitored_networks_size + ' endpoints';
    }
  }

  get networksDescription(): string {
    if (this.networks_count == 0) {
      return 'No networks defined';
    } else {
      return this.networks_count + ' networks containing ' + this.networks_size + ' endpoints';
    }
  }

  get timeSinceScan(): string {
    if (!this.last_scan_time) {
      return 'Never scanned before';
    } else {
      let now = new Date();
      let difference =  now.getTime() - this.lastScanDate.getTime();
      let days = Math.floor(difference / (1000 * 60 * 60 * 24));
      let scanDescription = '';
      if (days > 0) {
        scanDescription = scanDescription + days + ' days ago';
      } else {
        let hours = Math.floor(difference / (1000 * 60 * 60));
        if (hours > 0) {
          scanDescription = scanDescription + hours + ' hours ago';
        } else {
          let minutes = Math.floor(difference / (1000 * 60));
          scanDescription = scanDescription + minutes + ' minutes ago';
        }
      }
      return scanDescription;
    }
  }

}
