import { Injectable } from '@angular/core';
import {Organization} from "../../services/api-services/models/organization.class";
import {DetailItem} from "./models/detail-item.interface";
import {WebService} from "../../services/api-services/models/web-service.interface";
import {SslSupport} from "../../services/api-services/models/ssl-support.class";
import {HtmlWebResource} from "../../services/api-services/models/html-web-resources.class";
import {DomainNameReport} from "../../services/api-services/models/domain-name-report.class";

@Injectable()
export class DetailListService {

  constructor() { }

  public getDomainIpDetails(domainNameReport: DomainNameReport): DetailItem[] {
    let toReturn = [];
    if (domainNameReport.related_ips.length > 0) {
      for (let i=0; i<domainNameReport.related_ips.length; i++) {
        if (i == 0) {
          toReturn.push({
            title: 'Related IP Addresses',
            description: domainNameReport.related_ips[i].ip_address,
          });
        } else {
          toReturn.push({
            description: domainNameReport.related_ips[i].ip_address,
          });
        }
      }
    } else {
      toReturn.push({
        title: 'There were no IP addresses related to this domain.',
      });
    }
    return toReturn;
  }

  public getDomainResolutionDetails(domainNameReport: DomainNameReport): DetailItem[] {
    let toReturn = [];
    if (domainNameReport.resolutions.length > 0) {
      for (let resolution of domainNameReport.resolutions) {
        for (let i=0; i<resolution.record_contents.length; i++) {
          if (i == 0) {
            toReturn.push({
              title: resolution.record_type,
              description: resolution.record_contents[i],
            });
          } else {
            toReturn.push({
              description: resolution.record_contents[i],
            });
          }
        }
      }
    } else {
      toReturn.push({
        title: 'This domain had no resolutions.',
      });
    }
    return toReturn;
  }

  public getHtmlDetails(resource: HtmlWebResource): DetailItem[] {
    let toReturn = [];
    toReturn.push({
      title: 'Title',
      description: resource.title ? resource.title : 'No Title Found'
    });
    toReturn.push({
      title: 'Forms Count',
      description: resource.forms.length
    });
    toReturn.push({
      title: 'Links Count',
      description: resource.internal_url_reference_count + resource.external_url_reference_count
    });
    if (resource.meta_refresh_location) {
      toReturn.push({
        title: 'Meta Refresh Location',
        description: resource.meta_refresh_location,
      });
    }
    toReturn.push({
      title: 'Has Login Form',
      description: resource.has_login_form ? 'True' : 'False',
      filterKey: 'has_login_form',
      filterLabel: resource.has_login_form ? 'Has Login Form' : 'Does Not Have Login Form',
      filterValue: resource.has_login_form,
    });
    return toReturn;
  }

  public getOrganizationDetails(organization: Organization): DetailItem[] {
    let toReturn = [];
    let scanTimeDescription = '';
    if (organization.last_scan_time) {
      scanTimeDescription = organization.last_scan_time;
    } else {
      scanTimeDescription = 'This organization has not been scanned'
    }
    toReturn.push({title: 'Description', description: organization.description});
    toReturn.push({title: 'Monitored Services', description: organization.monitored_service_count});
    toReturn.push({title: 'Unmonitored Services', description: organization.unmonitored_service_count});
    toReturn.push({title: 'In-scope Networks', description: organization.monitored_networks_count});
    toReturn.push({title: 'Total Scoped Size', description: organization.monitored_networks_size});
    toReturn.push({title: 'Ready For Scan?', description: organization.ready_for_scan});
    toReturn.push({title: 'Last Scanned At', description: scanTimeDescription});
    return toReturn;
  }

  public getOrganizationEndpointDetails(organization: Organization): DetailItem[] {
    let toReturn = [];
    toReturn.push({title: '# of Defined Networks', description: organization.networks_count});
    toReturn.push({title: '# of Endpoints In All Networks', description: organization.networks_size});
    toReturn.push({title: '# of Domain Names', description: organization.domains_count});
    return toReturn;
  }

  public getOrganizationScanDetails(organization: Organization): DetailItem[] {
    let toReturn = [];
    toReturn.push({title: organization.lastScanDescription});
    return toReturn;
  }

  public getOrganizationSummaryDetails(organization: Organization): DetailItem[] {
    let toReturn = [];
    toReturn.push({title: 'Monitored Services', description: organization.monitored_service_count});
    toReturn.push({title: 'In-scope Networks', description: organization.monitored_networks_count});
    toReturn.push({title: 'Total Scoped Size', description: organization.monitored_networks_size});
    return toReturn;
  }

  public getSslCertificateDetails(sslSupport: SslSupport): DetailItem[] {
    let toReturn = [];
    toReturn.push({
      title: 'Certificate Subject',
      description: sslSupport.cert_subject_common_name,
      filterKey: 'cert_subject_common_name',
      filterLabel: 'Certificate CName Is ' + sslSupport.cert_subject_common_name
    });
    toReturn.push({title: 'Certificate Validity Dates', description: sslSupport.validityRange});
    let expDesc;
    if (sslSupport.expirationDescription) {
      expDesc = sslSupport.expirationDescription;
    } else {
      expDesc = 'Unknown';
    }
    toReturn.push({title: 'Certificate Expires In', description: expDesc});
    toReturn.push({
      title: 'Certificate Issuer Common Name',
      description: sslSupport.cert_issuer_common_name,
      filterKey: 'cert_issuer_common_name',
      filterLabel: 'Certificate Issuer Common Name Is ' + sslSupport.cert_issuer_common_name
    });
    toReturn.push({
      title: 'Certificate Issuer Organization',
      description: sslSupport.cert_issuer_organization,
      filterKey: 'cert_issuer_organization',
      filterLabel: 'Certificate Issuer Organization Is ' + sslSupport.cert_issuer_organization
    });
    toReturn.push({
      title: 'Certificate Issued To',
      description: sslSupport.cert_subject_organization,
      filterKey: 'cert_subject_organization',
      filterLabel: 'Certificate Issued To ' + sslSupport.cert_subject_organization
    });
    toReturn.push({
      title: 'Certificate Fingerprint',
      description: sslSupport.cert_md5_digest,
      filterKey: 'cert_md5_digest',
      filterLabel: 'Certificate Fingerprint Is ' + sslSupport.cert_md5_digest
    });
    return toReturn;
  }

  public getSslFingerprintDetails(sslSupport: SslSupport): DetailItem[] {
    let toReturn = [];
    toReturn.push({title: 'MD5 Certificate Fingerprint', description: sslSupport.cert_md5_digest});
    toReturn.push({title: 'SHA1 Certificate Fingerprint', description: sslSupport.cert_sha1_digest});
    toReturn.push({title: 'SHA256 Certificate Fingerprint', description: sslSupport.cert_sha256_digest});
    toReturn.push({title: 'SHA512 Certificate Fingerprint', description: sslSupport.cert_sha512_digest});
    return toReturn;
  }

  public getSslIssuerDetails(sslSupport: SslSupport): DetailItem[] {
    let toReturn = [];
    toReturn.push({title: 'Issuer Common Name', description: sslSupport.cert_issuer_common_name});
    toReturn.push({title: 'Issuer Country', description: sslSupport.cert_issuer_country});
    toReturn.push({title: 'Issuer State', description: sslSupport.cert_issuer_state});
    toReturn.push({title: 'Issuer Locality', description: sslSupport.cert_issuer_locality});
    toReturn.push({title: 'Issuer Organization', description: sslSupport.cert_issuer_organization});
    toReturn.push({title: 'Issuer Organizational Unit', description: sslSupport.cert_issuer_organizational_unit});
    toReturn.push({title: 'Issuer Email', description: sslSupport.cert_issuer_email});
    return toReturn;
  }

  public getSslPublicKeyDetails(sslSupport: SslSupport): DetailItem[] {
    let toReturn = [];
    toReturn.push({title: 'Key Length', description: sslSupport.cert_key_bits.toString() + ' bits'});
    toReturn.push({title: 'Key Type', description: sslSupport.cert_key_type});
    return toReturn;
  }

  public getSslSubjectDetails(sslSupport: SslSupport): DetailItem[] {
    let toReturn = [];
    toReturn.push({
      title: 'Subject Common Name',
      description: sslSupport.cert_subject_common_name,
      filterKey: 'cert_subject_common_name',
      filterLabel: 'Certificate CName Is ' + sslSupport.cert_subject_common_name
    });
    toReturn.push({
      title: 'Subject Country',
      description: sslSupport.cert_subject_country,
      filterKey: 'cert_subject_country',
      filterLabel: 'Certificate Subject Country Is ' + sslSupport.cert_subject_country
    });
    toReturn.push({title: 'Subject State', description: sslSupport.cert_subject_state});
    toReturn.push({title: 'Subject Locality', description: sslSupport.cert_subject_locality});
    toReturn.push({title: 'Subject Organization', description: sslSupport.cert_subject_organization});
    toReturn.push({title: 'Subject Organizational Unit', description: sslSupport.cert_subject_organizational_unit});
    toReturn.push({title: 'Subject Email', description: sslSupport.cert_subject_email});
    return toReturn;
  }

  public getSslSummaryDetails(sslSupport: SslSupport): DetailItem[] {
    let toReturn = [];
    let sslv3Line;
    if (sslSupport.supports_sslv2) {
      let supportedCount = sslSupport.sslv2_supported_ciphers ? sslSupport.sslv2_supported_ciphers.length : 0;
      toReturn.push({
        title: 'Supports SSLv2',
        description: 'True (' + supportedCount + ' ciphers supported)',
        filterKey: 'supports_sslv2',
        filterLabel: 'Supports SSLv2',
        filterValue: true,
      });
      toReturn.push({
        title: 'SSLv2 Preferred Cipher',
        description: sslSupport.sslv2_preferred_cipher ? sslSupport.sslv2_preferred_cipher : 'Unknown',
      });
    } else {
      toReturn.push({
        title: 'Supports SSLv2',
        description: 'False',
        filterKey: 'supports_sslv2',
        filterLabel: 'Does Not Support SSLv2',
        filterValue: false,
      });
    }
    if (sslSupport.supports_sslv3) {
      let supportedCount = sslSupport.sslv3_supported_ciphers ? sslSupport.sslv3_supported_ciphers.length : 0;
      toReturn.push({
        title: 'Supports SSLv3',
        description: 'True (' + supportedCount + ' ciphers supported)',
        filterKey: 'supports_sslv3',
        filterLabel: 'Supports SSLv3',
        filterValue: true,
      });
      toReturn.push({
        title: 'SSLv3 Preferred Cipher',
        description: sslSupport.sslv3_preferred_cipher ? sslSupport.sslv3_preferred_cipher : 'Unknown',
      });
    } else {
      toReturn.push({
        title: 'Supports SSLv3',
        description: 'False',
        filterKey: 'supports_sslv3',
        filterLabel: 'Does Not Support SSLv3',
        filterValue: false,
      });
    }
    if (sslSupport.supports_tlsv1) {
      let supportedCount = sslSupport.tlsv1_supported_ciphers ? sslSupport.tlsv1_supported_ciphers.length : 0;
      toReturn.push({
        title: 'Supports TLSv1',
        description: 'True (' + supportedCount + ' ciphers supported)',
        filterKey: 'supports_tlsv1',
        filterLabel: 'Supports TLSv1',
        filterValue: true,
      });
      toReturn.push({
        title: 'TLSv1 Preferred Cipher',
        description: sslSupport.tlsv1_preferred_cipher ? sslSupport.tlsv1_preferred_cipher : 'Unknown',
      });
    } else {
      toReturn.push({
        title: 'Supports TLSv1',
        description: 'False',
        filterKey: 'supports_tlsv1',
        filterLabel: 'Does Not Support TLSv1',
        filterValue: false,
      });
    }
    if (sslSupport.supports_tlsv1_1) {
      let supportedCount = sslSupport.tlsv1_1_supported_ciphers ? sslSupport.tlsv1_1_supported_ciphers.length : 0;
      toReturn.push({
        title: 'Supports TLSv1.1',
        description: 'True (' + supportedCount + ' ciphers supported)',
        filterKey: 'supports_tlsv1_1',
        filterLabel: 'Supports TLSv1.1',
        filterValue: true,
      });
      toReturn.push({
        title: 'TLSv1.1 Preferred Cipher',
        description: sslSupport.tlsv1_1_preferred_cipher ? sslSupport.tlsv1_1_preferred_cipher : 'Unknown',
      });
    } else {
      toReturn.push({
        title: 'Supports TLSv1.1',
        description: 'False',
        filterKey: 'supports_tlsv1_1',
        filterLabel: 'Does Not Support TLSv1.1',
        filterValue: false,
      });
    }
    if (sslSupport.supports_tlsv1_2) {
      let supportedCount = sslSupport.tlsv1_2_supported_ciphers ? sslSupport.tlsv1_2_supported_ciphers.length : 0;
      toReturn.push({
        title: 'Supports TLSv1.2',
        description: 'True (' + supportedCount + ' ciphers supported)',
        filterKey: 'supports_tlsv1_2',
        filterLabel: 'Supports TLSv1.2',
        filterValue: true,
      });
      toReturn.push({
        title: 'TLSv1.2 Preferred Cipher',
        description: sslSupport.tlsv1_2_preferred_cipher ? sslSupport.tlsv1_2_preferred_cipher : 'Unknown',
      });
    } else {
      toReturn.push({
        title: 'Supports TLSv1.2',
        description: 'False',
        filterKey: 'supports_tlsv1_2',
        filterLabel: 'Does Not Support TLSv1.2',
        filterValue: false,
      });
    }
    return toReturn;
  }

  public getSslValidityDetails(sslSupport: SslSupport): DetailItem[] {
    let toReturn = [];
    toReturn.push({title: 'Certificate Validity Start Date', description: sslSupport.validityStartDate ? sslSupport.validityStartDate.toDateString() : 'Unknown'});
    toReturn.push({title: 'Certificate Validity End Date', description: sslSupport.validityEndDate ? sslSupport.validityEndDate.toDateString() : 'Unknown'});
    if (sslSupport.cert_expired) {
      toReturn.push({title: 'Certificate Is Expired'});
    } else {
      toReturn.push({title: 'Certificate Expires In', description: sslSupport.expiryDays.toString() + ' days'});
    }
    toReturn.push({title: 'Certificate Is Trusted?', description: sslSupport.cert_is_trusted ? 'True' : 'False'});
    return toReturn;
  }

  public getSslv2ProtocolDetails(sslSupport: SslSupport): DetailItem[] {
    let toReturn = [];
    if (!sslSupport.supports_sslv2) {
      toReturn.push({title: 'No Support for SSLv2'});
    } else {
      toReturn.push({title: 'SSLv2 Preferred Cipher', description: sslSupport.sslv2_preferred_cipher});
      for (let i=0; i<sslSupport.sslv2_supported_ciphers.length; i++) {
        if (i == 0) {
          toReturn.push({title: 'SSLv2 Supported Ciphers', description: sslSupport.sslv2_supported_ciphers[i]});
        } else {
          toReturn.push({description: sslSupport.sslv2_supported_ciphers[i]});
        }
      }
    }
    return toReturn;
  }

  public getSslv3ProtocolDetails(sslSupport: SslSupport): DetailItem[] {
    let toReturn = [];
    if (!sslSupport.supports_sslv3) {
      toReturn.push({title: 'No Support for SSLv3'});
    } else {
      toReturn.push({title: 'SSLv3 Preferred Cipher', description: sslSupport.sslv3_preferred_cipher});
      for (let i=0; i<sslSupport.sslv3_supported_ciphers.length; i++) {
        if (i == 0) {
          toReturn.push({title: 'SSLv3 Supported Ciphers', description: sslSupport.sslv3_supported_ciphers[i]});
        } else {
          toReturn.push({description: sslSupport.sslv3_supported_ciphers[i]});
        }
      }
    }
    return toReturn;
  }

  public getTlsv1ProtocolDetails(sslSupport: SslSupport): DetailItem[] {
    let toReturn = [];
    if (!sslSupport.supports_tlsv1) {
      toReturn.push({title: 'No Support for TLSv1'});
    } else {
      toReturn.push({title: 'TLSv1 Preferred Cipher', description: sslSupport.tlsv1_preferred_cipher});
      for (let i=0; i<sslSupport.tlsv1_supported_ciphers.length; i++) {
        if (i == 0) {
          toReturn.push({title: 'TLSv1 Supported Ciphers', description: sslSupport.tlsv1_supported_ciphers[i]});
        } else {
          toReturn.push({description: sslSupport.tlsv1_supported_ciphers[i]});
        }
      }
    }
    return toReturn;
  }

  public getTlsv11ProtocolDetails(sslSupport: SslSupport): DetailItem[] {
    let toReturn = [];
    if (!sslSupport.supports_tlsv1_1) {
      toReturn.push({title: 'No Support for TLSv1.1'});
    } else {
      toReturn.push({title: 'TLSv1.1 Preferred Cipher', description: sslSupport.tlsv1_1_preferred_cipher});
      for (let i=0; i<sslSupport.tlsv1_1_supported_ciphers.length; i++) {
        if (i == 0) {
          toReturn.push({title: 'TLSv1.1 Supported Ciphers', description: sslSupport.tlsv1_1_supported_ciphers[i]});
        } else {
          toReturn.push({description: sslSupport.tlsv1_1_supported_ciphers[i]});
        }
      }
    }
    return toReturn;
  }

  public getTlsv12ProtocolDetails(sslSupport: SslSupport): DetailItem[] {
    let toReturn = [];
    if (!sslSupport.supports_tlsv1_2) {
      toReturn.push({title: 'No Support for TLSv1.2'});
    } else {
      toReturn.push({title: 'TLSv1.2 Preferred Cipher', description: sslSupport.tlsv1_2_preferred_cipher});
      for (let i=0; i<sslSupport.tlsv1_2_supported_ciphers.length; i++) {
        if (i == 0) {
          toReturn.push({title: 'TLSv1.2 Supported Ciphers', description: sslSupport.tlsv1_2_supported_ciphers[i]});
        } else {
          toReturn.push({description: sslSupport.tlsv1_2_supported_ciphers[i]});
        }
      }
    }
    return toReturn;
  }

  public getWebAppContentTypeDetails(webService: WebService): DetailItem[] {
    let toReturn = [];
    for (let dataPoint of webService.response_content_types) {
      toReturn.push({title: dataPoint.label, description: dataPoint.count});
    }
    if (webService.response_content_types.length == 0) {
      toReturn.push({title: 'No Content Types Returned'});
    }
    return toReturn;
  }

  public getWebAppEndpointDetails(webService: WebService): DetailItem[] {
    let toReturn = [];
    toReturn.push({
      title: 'IP Address',
      description: webService.ip_address,
      filterKey: 'ip_address',
      filterLabel: 'IP Address Is ' + webService.ip_address
    });
    toReturn.push({
      title: 'Port',
      description: webService.network_service_port,
      filterKey: 'network_service_port',
      filterLabel: 'TCP Port Is ' + webService.network_service_port,
    });
    toReturn.push({
      title: 'Open Ports On Host',
      description: webService.openPortsDescription
    });
    toReturn.push({
      title: 'Hostname',
      description: webService.web_service_host_name,
      filterKey: 'web_service_host_name',
      filterLabel: 'Hostname Is ' + webService.web_service_host_name,
    });
    if (!webService.hostnameIsIpAddress) {
      toReturn.push({title: 'Hostname Resolves', description: webService.hostname_resolves ? 'True': 'False'});
      if (webService.hostname_resolves) {
        toReturn.push({
          title: 'Hostname Resolves To',
          description: webService.resolved_ip_address,
          filterKey: 'resolved_ip_address',
          filterLabel: 'Hostname Resolves To ' + webService.resolved_ip_address
        });

        toReturn.push({
          title: 'Hostname Resolves To Endpoint',
          description: webService.resolved_ip_matches_hostname ? 'True': 'False',
          filterKey: 'resolved_ip_matches_hostname',
          filterLabel: webService.resolved_ip_matches_hostname ? 'Hostname Resolves To IP' : 'Hostname Does Not Resolve To IP'
        });
      }
    }
    toReturn.push({
      title: 'Network',
      description: webService.network_cidr_range,
      filterKey: 'network_cidr_range',
      filterLabel: 'Network CIDR Range Is ' + webService.network_cidr_range
    });
    toReturn.push({
      title: 'Uses SSL',
      description: webService.web_service_uses_ssl ? 'True': 'False',
      filterKey: 'web_service_uses_ssl',
      filterLabel: webService.web_service_uses_ssl ? 'Web Service Uses SSL' : 'Web Service Does Not Use SSL'
    });
    return toReturn;
  }

  public getWebAppResponseDetails(webService: WebService): DetailItem[] {
    let toReturn = [];
    for (let dataPoint of webService.response_statuses) {
      toReturn.push({title: dataPoint.label, description: dataPoint.count});
    }
    return toReturn;
  }

  public getWebAppSizeDetails(webService: WebService): DetailItem[] {
    let toReturn = [];
    toReturn.push({title: 'Total # Resources Discovered', description: webService.response_count});
    toReturn.push({title: 'Total Site Size (Bytes)', description: webService.total_resource_size});
    return toReturn;
  }

  public getWebAppSslDetails(webService: WebService): DetailItem[] {
    let toReturn = [];
    if (!webService.has_ssl_certificate_data) {
      toReturn.push({title: 'No Data Available'});
    } else {
      toReturn.push({
        title: 'Certificate Subject',
        description: webService.ssl_certificate_cname,
        filterKey: 'ssl_certificate_cname',
        filterLabel: 'SSL Certificate CName Is ' + webService.ssl_certificate_cname
      });
      toReturn.push({title: 'Certificate Validity Dates', description: webService.sslValidityRange});
      if (!webService.ssl_certificate_expired) {
        toReturn.push({title: 'Certificate Expires In', description: webService.sslExpirationDescription ? webService.sslExpirationDescription : 'Unknown'});
      }
      if (!webService.ssl_certificate_is_valid) {
        toReturn.push({title: 'SSL Certificate Not Valid'});
        let invalidDescription = '';
        if (webService.ssl_certificate_expired) {
          invalidDescription = 'Certificate Expired';
        } else {
          invalidDescription = 'Certificate Not Trusted';
        }
        toReturn.push({title: 'Invalid SSL Certificate Cause', description: invalidDescription});
      }
    }
    return toReturn;
  }

  public getWebAppSummaryDetails(webService: WebService): DetailItem[] {
    let toReturn = [];
    toReturn.push({
      title: 'Landing Page Title',
      description: webService.landing_title ? webService.landing_title : 'None'
    });
    toReturn.push({
      title: 'Discovered By',
      description: webService.network_service_discovered_by,
    });
    toReturn.push({
      title: 'Server Headers',
      description: webService.serverHeadersDescription,
    });
    if (webService.landing_header_redirect_location) {
      toReturn.push({
        title: 'Landing Page Header Redirects To',
        description: webService.landing_header_redirect_location,
      });
    }
    if (webService.landing_meta_refresh_location) {
      toReturn.push({
        title: 'Landing Page Meta Redirects To',
        description: webService.landing_meta_refresh_location,
      });
    }
    if (webService.local_login_form_count > 0 || webService.remote_login_form_count > 0) {
      toReturn.push({
        title: 'Authentication Forms',
        description: webService.localAuthFormsDescription,
      });
      toReturn.push({
        description: webService.remoteAuthFormsDescription,
      });
    }
    if (webService.hasHttpAuth) {
      toReturn.push({
        title: 'HTTP Authentication Methods',
        description: webService.httpAuthTypesDescription,
      });
    }
    if (webService.landing_response_status) {
      toReturn.push({
        title: 'Landing Page Response Code',
        description: webService.landing_response_status,
        filterKey: 'landing_response_status',
        filterLabel: 'Landing Page Response Code Is ' + webService.landing_response_status,
      });
    }
    return toReturn;
  }

  public getWebResourceSummaryDetails(resource: any): DetailItem[] {
    let toReturn = [];
    toReturn.push({
      title: 'Request Verb',
      description: resource.request_method,
      filterKey: 'request_method',
      filterLabel: 'Request Verb Is ' + resource.request_method,
    });
    toReturn.push({
      title: 'Response Status Code',
      description: resource.response_status,
      filterKey: 'response_status',
      filterLabel: 'Response Status Code Is ' + resource.response_status,
    });
    toReturn.push({
      title: 'Content Type',
      description: resource.content_type,
      filterKey: 'content_type',
      filterLabel: 'Content Type Is ' + resource.content_type,
    });
    toReturn.push({title: 'Content Size', description: resource.content_length});
    toReturn.push({
      title: 'Content MD5 Hash',
      description: resource.content_sha256_hash,
      filterKey: 'content_sha256_hash',
      filterLabel: 'Content SHA256 Hash Is ' + resource.content_sha256_hash,
    });
    if (resource.header_redirect_location) {
      toReturn.push({
        title: 'Header Redirect Location',
        description: resource.header_redirect_location
      });
    }
    return toReturn;
  }

  public getWebServiceDetails(webService: WebService): DetailItem[] {
    let toReturn = [];
    toReturn.push({title: 'Location', description: webService.location});
    toReturn.push({title: 'URL', description: webService.url});
    toReturn.push({title: 'Uses SSL?', description: webService.sslEnabled});
    toReturn.push({title: 'Network', description: webService.network_cidr_range});
    toReturn.push({title: 'Size', description: webService.total_resource_size.toString() + ' bytes found across ' + webService.transactions_count.toString() + ' resources'});
    return toReturn;
  }

}
