import {DataPoint} from "./data-point.interface";
import {BaseModel} from "../model-base.class";

export class WebServiceAnalytics extends BaseModel {

  public uses_wordpress: DataPoint[];
  public uses_iis: DataPoint[];
  public uses_apache: DataPoint[];
  public uses_nginx: DataPoint[];
  public uses_tomcat_management_portal: DataPoint[];
  public network_cidr_range: DataPoint[];
  public network_service_port: DataPoint[];
  public web_service_uses_ssl: DataPoint[];
  public has_www_authenticate_headers: DataPoint[];
  public hostname_is_ip_address: DataPoint[];

  public static fromObject(toParse: any): any {
    return new WebServiceAnalytics(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(WebServiceAnalytics.fromObject(curParse));
    }
    return toReturn;
  }

}
