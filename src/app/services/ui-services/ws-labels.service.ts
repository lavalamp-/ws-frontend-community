import { Injectable } from '@angular/core';
import {WsCaseService} from "./ws-case.service";

@Injectable()
export class WsLabelsService {

  private labelMap: any = {
    cert_has_start_time: 'Certificate Has Start Date',
    cert_start_time: 'Certificate Start Date',
    cert_has_invalid_time: 'Certificate Has Expiry Date',
    cert_invalid_time: 'Expiry Date',
    cert_expired: 'Certificate Is Expired',
    cert_md5_digest: 'Certificate MD5 Digest',
    cert_sha1_digest: 'Certificate SHA1 Digest',
    cert_sha256_digest: 'Certificate SHA256 Digest',
    cert_sha512_digest: 'Certificate SHA512 Digest',
    cert_has_authority_key_id: 'Has Authority Key ID Extension',
    cert_has_subject_key_id: 'Has Subject Key ID Extension',
    cert_has_extended_key_usage: 'Has Extended Key Usage Extension',
    cert_has_certificate_policies: 'Has Certificate Policies Extension',
    cert_has_crl_distribution_points: 'Has CRL Distribution Points Extension',
    cert_has_subject_alt_name: 'Has Subject Alternative Name Extension',
    cert_has_authority_info_access: 'Has Authority Info Access Extension',
    network_cidr_range: 'Network CIDR Range',
  };

  private labelSegmentMap: any = {
    cert: 'Certificate',
  };

  constructor(
    private caseService: WsCaseService,
  ) { }

  public getLabelFromString(toProcess: string): string {
    if (this.labelMap.hasOwnProperty(toProcess)) {
      return this.labelMap[toProcess];
    } else {
      return this.parseStringIntoLabel(toProcess);
    }
  }

  public getLabelsFromStrings(toProcess: string[]): string[] {
    let toReturn = [];
    for (let curProcess of toProcess) {
      toReturn.push(this.getLabelFromString(curProcess));
    }
    return toReturn;
  }

  private parseStringIntoLabel(toProcess: string): string {
    let segments = this.caseService.snakeCaseToStrings(toProcess);
    let toReturn = [];
    for (let segment of segments) {
      if (this.labelSegmentMap.hasOwnProperty(segment)) {
        toReturn.push(this.labelSegmentMap[segment]);
      } else {
        toReturn.push(this.caseService.titleCase(segment));
      }
    }
    return toReturn.join(' ');
  }

}
