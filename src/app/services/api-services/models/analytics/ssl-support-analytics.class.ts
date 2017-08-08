import {BaseModel} from "../model-base.class";
import {DataPoint} from "./data-point.interface";

export class SslSupportAnalytics extends BaseModel {

  public cert_expired: DataPoint[];
  public cert_is_valid: DataPoint[];
  public cert_key_type: DataPoint[];
  public cert_key_bits: DataPoint[];
  public cert_issuer_common_name: DataPoint[];
  public cert_issuer_country: DataPoint[];
  public cert_issuer_email: DataPoint[];
  public cert_issuer_hash: DataPoint[];
  public cert_issuer_locality: DataPoint[];
  public cert_issuer_organization: DataPoint[];
  public cert_issuer_organizational_unit: DataPoint[];
  public cert_issuer_state: DataPoint[];
  public cert_subject_common_name: DataPoint[];
  public cert_subject_country: DataPoint[];
  public cert_subject_email: DataPoint[];
  public cert_subject_hash: DataPoint[];
  public cert_subject_locality: DataPoint[];
  public cert_subject_organization: DataPoint[];
  public cert_subject_organizational_unit: DataPoint[];
  public cert_subject_state: DataPoint[];
  public network_service_port: DataPoint[];
  public network_cidr_range: DataPoint[];
  public is_vulnerable: DataPoint[];
  public filter_fields: string[];

  public static fromObject(toParse: any): any {
    return new SslSupportAnalytics(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(SslSupportAnalytics.fromObject(curParse));
    }
    return toReturn;
  }

}
