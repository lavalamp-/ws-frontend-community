import { Injectable } from '@angular/core';
import {WebService} from "../api-services/models/web-service.interface";
import {WsChip} from "./models/chip.interface";
import {SslSupport} from "../api-services/models/ssl-support.class";

@Injectable()
export class WsChipsService {

  constructor() { }

  public getChipsForSslSupport(sslSupport: SslSupport, isSmall: boolean = true): WsChip[] {
    let toReturn = [];
    if (sslSupport.flags) {
      for (let flag of sslSupport.flags) {
        toReturn.push({
          badgeText: flag.flag_name,
          successful: true,
        })
      }
    }
    return toReturn;
  }

  public getChipsForWebApp(webApp: WebService, isSmall: boolean = true): WsChip[] {
    let toReturn = [];
    if (webApp.uses_wordpress) {
      toReturn.push({
        badgeText: 'Wordpress',
        successful: true,
      });
    }
    // if (webApp.uses_tomcat_management_portal) {
    //   toReturn.push({
    //     badgeText: 'Tomcat Management Portal',
    //     successful: false
    //   });
    // }
    if (webApp.has_multiple_server_headers) {
      toReturn.push({
        badgeText: 'Multiple Server Headers',
        successful: false
      });
    } else if (webApp.uses_apache) {
      toReturn.push({
        badgeText: 'Apache',
        successful: true
      });
    } else if (webApp.uses_nginx) {
      toReturn.push({
        badgeText: 'Nginx',
        successful: true
      });
    } else if (webApp.uses_iis) {
      toReturn.push({
        badgeText: 'IIS',
        successful: true
      });
    }
    if (webApp.has_www_authenticate_headers) {
      toReturn.push({
        badgeText: 'Uses HTTP Authentication',
        successful: false
      });
    }
    if (webApp.ip_address != webApp.hostname) {
      if (!webApp.hostname_resolves) {
        toReturn.push({
          badgeText: 'Hostname Doesn\'t Resolve',
          successful: false
        });
      } else if (!webApp.resolved_ip_matches_hostname) {
        toReturn.push({
          badgeText: 'Hostname Resolution Mismatch',
          successful: false
        });
      }
    }
    if (webApp.all_responses_redirects) {
      toReturn.push({
        badgeText: 'All Responses Redirects',
        successful: true,
      });
    }
    if (webApp.all_responses_client_errors) {
      toReturn.push({
        badgeText: 'All Responses Client Errors',
        successful: true,
      });
    }
    if (webApp.all_responses_server_errors) {
      toReturn.push({
        badgeText: 'All Responses Server Errors',
        successful: false,
      });
    }
    if (webApp.web_service_uses_ssl && webApp.has_ssl_certificate_data) {
      if (!webApp.ssl_certificate_is_valid) {
        if (webApp.ssl_certificate_expired) {
          toReturn.push({
            badgeText: 'SSL Certificate Expired',
            successful: false
          });
        } else {
          toReturn.push({
            badgeText: 'SSL Certificate Not Trusted',
            successful: false,
          });
        }
      }
    }
    return toReturn;
  }

  public getChipsFromFlags(toParse: any): WsChip[] {
    let toReturn = [];
    if (toParse.flags) {
      for (let flag of toParse.flags) {
        toReturn.push({
          badgeText: flag.flag_name,
          successful: true,
        });
      }
    }
    return toReturn;
  }

}
