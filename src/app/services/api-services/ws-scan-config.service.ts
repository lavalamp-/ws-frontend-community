import {Injectable, Inject} from '@angular/core';
import {WsHttpService} from "./ws-http.service";
import {QueryHelperService} from "./query-helper.service";
import {WsPresentationService} from "./ws-presentation.service";
import {APP_CONFIG} from "../../app.config";
import {Observable} from "rxjs";
import {PresentationResponse} from "./models/responses/presentation-response.interface";
import {ScanConfig} from "./models/scan-config.class";
import {QueryFilter} from "./models/requests/query-filter.class";
import {ManyApiResponse} from "./models/responses/many-api-response.interface";
import {ScanPort} from "./models/scan-port.class";
import {DnsRecordType} from "./models/dns-record-type.class";
import {ScanConfigValidityResponse} from "./models/responses/scan-config-validity-response.interface";

@Injectable()
export class WsScanConfigService {

  private _baseUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private queryService: QueryHelperService,
    private presentationService: WsPresentationService,
    @Inject(APP_CONFIG) private config,
  ) {
    this._baseUrl = config.apiUrl + 'scan-configs/';
  }

  public createDnsRecordTypeForScanConfig(scanUuid: string, recordType: string): Observable<DnsRecordType> {
    let requestUrl = this.baseUrl + scanUuid + '/dns-record-types/';
    let toSend = {
      record_type: recordType,
    };
    return this.wsHttp.post(requestUrl, toSend)
      .map(response => DnsRecordType.fromObject(response.json()));
  }

  public createScanPortForScanConfig(scanUuid: string, portNumber: number, protocol: string): Observable<ScanPort> {
    let requestUrl = this.baseUrl + scanUuid + '/scan-ports/';
    let toSend = {
      port_number: portNumber,
      protocol: protocol,
    };
    return this.wsHttp.post(requestUrl, toSend)
      .map(response => ScanPort.fromObject(response.json()));
  }

  public getDnsRecordTypesForConfig(uuid: string, pageNumber: number = 1, queryFilters: QueryFilter[] = [], orderField: string = null, orderDirection: string = null): Observable<ManyApiResponse<DnsRecordType[]>> {
    let requestUrl = this.baseUrl + uuid + '/dns-record-types/';
    let queryString = this.queryService.getQueryString(pageNumber, queryFilters, orderField, orderDirection);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json() as ManyApiResponse<DnsRecordType[]>;
        toReturn.results = DnsRecordType.fromObjects(toReturn.results);
        return toReturn;
      });
  }

  public getPresentation(): Observable<PresentationResponse> {
    return this.presentationService.getPresentationByUrl('scanConfig', this.baseUrl);
  }

  public getScanConfig(configUuid: string): Observable<ScanConfig> {
    let requestUrl = this.baseUrl + configUuid + '/';
    return this.wsHttp.get(requestUrl)
      .map(response => ScanConfig.fromObject(response.json()));
  }

  public getScanConfigValidity(uuid: string): Observable<ScanConfigValidityResponse> {
    let requestUrl = this.baseUrl + uuid + '/is-valid/';
    return this.wsHttp.get(requestUrl)
      .map(response => response.json() as ScanConfigValidityResponse);
  }

  public getScanPortsForConfig(uuid: string, pageNumber: number = 1, queryFilters: QueryFilter[] = [], orderField: string = null, orderDirection: string = null): Observable<ManyApiResponse<ScanPort[]>> {
    let requestUrl = this.baseUrl + uuid + '/scan-ports/';
    let queryString = this.queryService.getQueryString(pageNumber, queryFilters, orderField, orderDirection);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json() as ManyApiResponse<ScanPort[]>;
        toReturn.results = ScanPort.fromObjects(toReturn.results);
        return toReturn;
      });
  }

  public updateScanConfig(uuid: string, updateDict: any): Observable<ScanConfig> {
    let requestUrl = this.baseUrl + uuid + '/';
    return this.wsHttp.patch(requestUrl, updateDict)
      .map(response => ScanConfig.fromObject(response.json()));
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }

}
