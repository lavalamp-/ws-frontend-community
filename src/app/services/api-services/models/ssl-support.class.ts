import {BaseScanModel} from "./scan-model-base.class";

export interface CertExtension {
  extension_name: string,
  extension_content: string,
}

export class SslSupport extends BaseScanModel {

  public cert_serial_number: string;
  public cert_version: number;
  public cert_has_start_time: boolean;
  public cert_start_time: string;
  public cert_has_invalid_time: boolean;
  public cert_invalid_time: string;
  public cert_expired: boolean;
  public cert_md5_digest: string;
  public cert_sha1_digest: string;
  public cert_sha256_digest: string;
  public cert_sha512_digest: string;
  public cert_key_bits: number;
  public cert_key_type: string;
  public cert_public_key: string;
  public cert_content: string;
  public cert_issuer_common_name: string;
  public cert_issuer_country: string;
  public cert_issuer_email: string;
  public cert_issuer_hash: string;
  public cert_issuer_locality: string;
  public cert_issuer_organization: string;
  public cert_issuer_organizational_unit: string;
  public cert_issuer_state: string;
  public cert_subject_common_name: string;
  public cert_subject_country: string;
  public cert_subject_email: string;
  public cert_subject_hash: string;
  public cert_subject_locality: string;
  public cert_subject_organization: string;
  public cert_subject_organizational_unit: string;
  public cert_subject_state: string;
  public cert_extension_names: string[];
  public cert_has_authority_key_id: boolean;
  public cert_authority_key_id: string;
  public cert_has_subject_key_id: boolean;
  public cert_subject_key_id: string;
  public cert_has_extended_key_usage: boolean;
  public cert_extended_key_usage: string;
  public cert_has_certificate_policies: boolean;
  public cert_certificate_policies: string;
  public cert_has_crl_distribution_points: boolean;
  public cert_crl_distribution_points: string;
  public cert_has_subject_alt_name: boolean;
  public cert_subject_alt_name: string;
  public cert_has_authority_info_access: boolean;
  public cert_authority_info_access: string;
  public cert_is_valid: boolean;
  public ip_address: string;
  public network_service_port: number;
  public supports_sslv3: boolean;
  public supports_tlsv1: boolean;
  public supports_tlsv1_1: boolean;
  public supports_tlsv1_2: boolean;
  public sslv3_preferred_cipher: string;
  public tlsv1_preferred_cipher: string;
  public tlsv1_1_preferred_cipher: string;
  public tlsv1_2_preferred_cipher: string;
  public sslv3_supported_ciphers: string[];
  public tlsv1_supported_ciphers: string[];
  public tlsv1_1_supported_ciphers: string[];
  public tlsv1_2_supported_ciphers: string[];
  public is_vulnerable: boolean;
  public org_uuid: string;
  public network_service_uuid: string;
  public cert_is_trusted: boolean;
  public cert_extensions: CertExtension[];
  public supports_sslv2: boolean;
  public sslv2_preferred_cipher: string;
  public sslv2_supported_ciphers: string[];

  public static fromObject(toParse: any): any {
    return new SslSupport(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(SslSupport.fromObject(curParse));
    }
    return toReturn;
  }

  get endpoint(): string {
    return this.ip_address + ':' + this.network_service_port.toString();
  }

  get expiryDays(): number {
    if (this.validityEndDate) {
      let now = new Date();
      let difference = this.validityEndDate.getTime() - now.getTime();
      return Math.floor(difference / (1000 * 60 * 60 * 24));
    }
  }

  get expirationDescription(): string {
    if (this.validityEndDate) {
      let now = new Date();
      if (now > this.validityEndDate) {
        return 'Certificate already expired';
      } else {
        return 'Certificate expires in ' + this.expiryDays + ' days';
      }
    } else {
      return null;
    }
  }

  get uuid(): string {
    return this.network_service_uuid;
  }

  get validityEndDate(): Date {
    if (this.cert_invalid_time) {
      return new Date(this.cert_invalid_time);
    } else {
      return null;
    }
  }

  get validityRange(): string {
    let toReturn = '';
    if (this.validityStartDate) {
      toReturn = toReturn + this.validityStartDate.toDateString();
    } else {
      toReturn = toReturn + 'Unknown';
    }
    toReturn = toReturn + ' - ';
    if (this.validityEndDate) {
      toReturn = toReturn + this.validityEndDate.toDateString();
    } else {
      toReturn = toReturn + 'Unknown';
    }
    return toReturn;
  }

  get validityStartDate(): Date {
    if (this.cert_start_time) {
      return new Date(this.cert_start_time);
    } else {
      return null;
    }
  }

}
