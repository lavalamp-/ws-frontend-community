import {DataPoint} from "./analytics/data-point.interface";
import {BaseScanModel} from "./scan-model-base.class";

interface OpenPort {
  port: number,
  protocol: string,
}

export class WebService extends BaseScanModel {

  public client_error_count: number;
  public ip_address: string;
  public network_cidr_range: string;
  public network_service_port: number;
  public ok_count: number;
  public redirect_count: number;
  public server_error_count: number;
  public uses_apache: boolean;
  public uses_iis: boolean;
  public uses_nginx: boolean;
  public uses_wordpress: boolean;
  public web_service_host_name: string;
  public web_service_scan_uuid: string;
  public web_service_uses_ssl: boolean;
  public web_service_uuid: string;
  public transactions_count: number;
  public total_resource_size: number;
  public uses_tomcat_management_portal: boolean;
  public has_screenshots: boolean;
  public screenshots_count: number;
  public screenshot_url: string;
  public response_count: number;
  public redirect_301_count: number;
  public redirect_302_count: number;
  public all_responses_redirects: boolean;
  public all_responses_server_errors: boolean;
  public all_responses_client_errors: boolean;
  public response_statuses: DataPoint[];
  public hostname_resolves: boolean;
  public resolved_ip_matches_hostname: boolean;
  public response_content_types: DataPoint[];
  public www_authenticate_headers: string[];
  public has_www_authenticate_headers: boolean;
  public has_basic_auth: boolean;
  public has_digest_auth: boolean;
  public has_ntlm_auth: boolean;
  public basic_auth_realms: string[];
  public has_server_headers: boolean;
  public has_multiple_server_headers: boolean;
  public resolved_ip_address: string;
  public ssl_certificate_cname: string;
  public ssl_certificate_expired: boolean;
  public ssl_certificate_is_valid: boolean;
  public ssl_certificate_start_time: string;
  public ssl_certificate_invalid_time: string;
  public scan_completed_at: string;
  public has_ssl_certificate_data: boolean;
  public org_uuid: string;
  public open_ports: OpenPort[];
  public landing_header_redirect_location: string;
  public landing_meta_refresh_location: string;
  public landing_response_status: number;
  public landing_title: string;
  public local_login_form_count: number;
  public local_login_form_https_count: number;
  public remote_login_form_count: number;
  public remote_login_form_https_count: number;
  public server_headers: string[];
  public network_service_discovered_by: string;

  public static fromObject(toParse: any): any {
    return new WebService(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(WebService.fromObject(curParse));
    }
    return toReturn;
  }

  get hasHttpAuth(): boolean {
    return this.has_digest_auth || this.has_basic_auth || this.has_ntlm_auth;
  }

  get hasScreenshot(): boolean {
    return !(!this.screenshot_url);
  }

  get hostname(): string {
    return this.web_service_host_name;
  }

  get hostnameIsIpAddress(): boolean {
    return this.hostname == this.ip_address;
  }

  get httpAuthTypesDescription(): string {
    let authTypes = [];
    if (this.has_basic_auth) {
      authTypes.push('Basic');
    }
    if (this.has_digest_auth) {
      authTypes.push('Digest');
    }
    if (this.has_ntlm_auth) {
      authTypes.push('NTLM');
    }
    return authTypes.join(', ');
  }

  get localAuthFormsDescription(): string {
    return 'local: ' + this.local_login_form_count + ' (' + this.local_login_form_https_count + ' over HTTPS)';
  }

  get location(): string {
    return this.ip_address + ':' + this.port.toString();
  }

  get openPortsDescription(): string {
    if (this.open_ports && this.open_ports.length > 0) {
      let openPorts = [];
      for (let curPort of this.open_ports) {
        openPorts.push(curPort.port);
      }
      return openPorts.join(', ');
    } else {
      return 'No Open Ports';
    }
  }

  get port(): number {
    return this.network_service_port;
  }

  get remoteAuthFormsDescription(): string {
    return 'remote: ' + this.remote_login_form_count + ' (' + this.remote_login_form_https_count + ' over HTTPS)';
  }

  get serverHeadersDescription(): string {
    if (this.server_headers.length > 0) {
      return this.server_headers.join(', ');
    } else {
      return 'No Server Headers Found';
    }
  }

  get sslEnabled(): boolean {
    return this.web_service_uses_ssl;
  }

  get sslExpirationDescription(): string {
    if (this.sslValidityEndDate) {
      let now = new Date();
      if (now > this.sslValidityEndDate) {
        return 'Certificate already expired';
      } else {
        let difference = this.sslValidityEndDate.getTime() - now.getTime();
        let days = Math.floor(difference / (1000 * 60 * 60 * 24));
        return 'Certificate expires in ' + days.toString() + ' days';
      }
    } else {
      return null;
    }
  }

  get sslValidityEndDate(): Date {
    if (this.ssl_certificate_invalid_time) {
      return new Date(this.ssl_certificate_invalid_time);
    } else {
      return null;
    }
  }

  get sslValidityRange(): string {
    let toReturn = '';
    if (this.sslValidityStartDate) {
      toReturn = toReturn + this.sslValidityStartDate.toDateString();
    } else {
      toReturn = toReturn + 'Unknown';
    }
    toReturn = toReturn + ' - ';
    if (this.sslValidityEndDate) {
      toReturn = toReturn + this.sslValidityEndDate.toDateString();
    } else {
      toReturn = toReturn + 'Unknown';
    }
    return toReturn;
  }

  get sslValidityStartDate(): Date {
    if (this.ssl_certificate_start_time) {
      return new Date(this.ssl_certificate_start_time);
    } else {
      return null;
    }
  }

  get titleDescription(): string {
    if (this.landing_title) {
      return this.url + ' - ' + this.landing_title;
    } else {
      return this.url;
    }
  }

  get url(): string {
    let scheme = this.sslEnabled ? 'https' : 'http';
    if ((this.sslEnabled && this.port == 443) || (!this.sslEnabled && this.port == 80)) {
      return scheme + '://' + this.hostname + '/';
    } else {
      return scheme + '://' + this.hostname + ':' + this.port.toString() + '/';
    }
  }

  get uuid(): string {
    return this.web_service_uuid;
  }

}
