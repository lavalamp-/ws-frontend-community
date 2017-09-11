import {BaseModel} from "./model-base.class";

export class ScanConfig extends BaseModel {

  public name: string;
  public description: string;
  public is_default: boolean;
  public saved_for_later: boolean;
  public scan_domain_names: boolean;
  public scan_network_ranges: boolean;
  public scan_ip_addresses: boolean;
  public scan_network_services: boolean;
  public scan_ssl_support: boolean;
  public dns_enumerate_subdomains: boolean;
  public dns_scan_resolutions: boolean;
  public network_scan_bandwidth: string;
  public network_inspect_live_hosts: boolean;
  public ip_address_geolocate: boolean;
  public ip_address_reverse_hostname: boolean;
  public ip_address_historic_dns: boolean;
  public ip_address_as_data: boolean;
  public ip_address_whois_data: boolean;
  public network_service_check_liveness: boolean;
  public network_service_fingerprint: boolean;
  public network_service_inspect_app: boolean;
  public ssl_enumerate_vulns: boolean;
  public ssl_enumerate_cipher_suites: boolean;
  public ssl_retrieve_cert: boolean;
  public app_inspect_web_app: boolean;
  public web_app_include_http_on_https: boolean;
  public web_app_enum_vhosts: boolean;
  public web_app_take_screenshot: boolean;
  public web_app_do_crawling: boolean;
  public web_app_enum_user_agents: boolean;

  public static fromObject(toParse: any): any {
    return new ScanConfig(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(ScanConfig.fromObject(curParse));
    }
    return toReturn;
  }

}
