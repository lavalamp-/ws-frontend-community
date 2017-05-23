import {Injectable, Inject} from '@angular/core';
import {WsHttpService} from "./ws-http.service";
import {QueryHelperService} from "./query-helper.service";
import {APP_CONFIG} from "../../app.config";
import {SslSupport} from "./models/ssl-support.class";
import {Observable} from "rxjs";
import {ManyApiResponse} from "./models/responses/many-api-response.interface";
import {QueryFilter} from "./models/requests/query-filter.class";
import {QueryOrdering} from "./models/requests/query-ordering.class";
import {WsConversionService} from "./ws-conversion.service";
import {ResponseContentType} from "@angular/http";
import {DownloadHelperService} from "../data-services/download-helper.service";
import {PresentationResponse} from "./models/responses/presentation-response.interface";
import {WsPresentationService} from "./ws-presentation.service";

@Injectable()
export class WsSslSupportService {

  baseUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private queryService: QueryHelperService,
    private conversionService: WsConversionService,
    private downloadHelper: DownloadHelperService,
    private presentationService: WsPresentationService,
    @Inject(APP_CONFIG) private config,
  ) {
    this.baseUrl = config.apiUrl + 'ssl-support/';
  }

  public exportSslSupportRelated(networkServiceUuid: string, queryFilters: QueryFilter[] = [], exportType: string, searchTerm: string, queryOrdering: QueryOrdering = null): void {
    let requestUrl = this.baseUrl + networkServiceUuid + '/related-services/';
    let queryString = this.queryService.getExportQueryString(exportType, queryFilters, searchTerm, queryOrdering);
    requestUrl = requestUrl + '?' + queryString;
    this.wsHttp.get(requestUrl, {responseType: ResponseContentType.Blob})
      .subscribe(response => this.downloadHelper.downloadFileFromResponse(response));
  }

  public getPresentation(orgUuid: string): Observable<PresentationResponse> {
    let requestUrl = this.config.apiUrl + 'organizations/' + orgUuid + '/ssl-support/';
    return this.presentationService.getPresentationByUrl('sslSupport', requestUrl);
  }

  public getRelatedPresentation(networkServiceUuid: string): Observable<PresentationResponse> {
    let requestUrl = this.baseUrl + networkServiceUuid + '/related-services/';
    return this.presentationService.getPresentationByUrl('sslSupportRelated', requestUrl);
  }

  public getRelatedUrl(networkServiceUuid: string): string {
    return this.baseUrl + networkServiceUuid + '/related-services/';
  }

  public getSslSupportDetails(networkServiceUuid: string): Observable<SslSupport> {
    let requestUrl = this.baseUrl + networkServiceUuid + '/';
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json();
        return SslSupport.fromObject(toReturn);
      });
  }

  public getSslSupportRelated(uuid: string, pageNumber: number = 1, queryFilters: QueryFilter[] = [], searchTerm: string = null, queryOrdering: QueryOrdering = null): Observable<ManyApiResponse<any[]>> {
    let requestUrl = this.baseUrl + uuid + '/related-services/';
    let queryString = this.queryService.getQueryStringNew(pageNumber, queryFilters, queryOrdering, searchTerm);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json() as ManyApiResponse<any[]>;
        toReturn.results = this.conversionService.getResponseObjects(toReturn.results);
        return toReturn;
      })
  }

}
