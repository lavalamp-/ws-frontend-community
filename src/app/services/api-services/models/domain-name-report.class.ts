import {BaseScanModel} from "./scan-model-base.class";
/**
 * Created by lavalamp on 8/3/17.
 */

export interface RelatedIpAddress {
  ip_address: string;
  ip_address_uuid: string;
}

export interface DomainResolution {
  record_contents: string[];
  record_type: string;
}

export interface Subdomain {
  subdomain: string;
  subdomain_uuid: string;
}

export class DomainNameReport extends BaseScanModel {

  public domain_added_by: string;
  public domain_name: string;
  public domain_scan_uuid: string;
  public domain_uuid: string;
  public has_resolutions: boolean;
  public org_uuid: string;
  public related_ips: RelatedIpAddress[];
  public resolutions: DomainResolution[];
  public subdomains: Subdomain[];

  public static fromObject(toParse: any): any {
    return new DomainNameReport(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(DomainNameReport.fromObject(curParse));
    }
    return toReturn;
  }

  get uuid(): string {
    return this.domain_uuid;
  }

}
