import {Injectable, Inject} from '@angular/core';
import {WsHttpService} from "./ws-http.service";
import {APP_CONFIG} from "../../app.config";
import {Observable} from "rxjs";
import {WebService} from "./models/web-service.interface";
import {QueryFilter} from "./models/requests/query-filter.class";
import {HttpTransactionAnalytics} from "./models/analytics/http-transaction-analytics.interface";
import {QueryHelperService} from "./query-helper.service";
import {ManyApiResponse} from "./models/responses/many-api-response.interface";
import {HttpTransaction} from "./models/es/http-transaction.interface";
import {HttpScreenshot} from "./models/es/http-screenshot.interface";
import {QueryOrdering} from "./models/requests/query-ordering.class";
import {WsConversionService} from "./ws-conversion.service";
import {PresentationResponse} from "./models/responses/presentation-response.interface";
import {WsPresentationService} from "./ws-presentation.service";
import {WebResourceAnalytics} from "./models/analytics/web-resource-analytics.interface";

@Injectable()
export class WebServiceService {

  private _baseUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private queryService: QueryHelperService,
    private conversionService: WsConversionService,
    private presentationService: WsPresentationService,
    @Inject(APP_CONFIG) private config
  ) {
    this._baseUrl = config.apiUrl + 'web-services/';
  }

  public getPresentation(orgUuid: string): Observable<PresentationResponse> {
    let requestUrl = this.config.apiUrl + 'organizations/' + orgUuid + '/es/web-services/';
    return this.presentationService.getPresentationByUrl('webApp', requestUrl);
  }

  public getResourceAnalytics(networkServiceUuid: string, queryFilters: QueryFilter[] = [], searchTerm: string = null): Observable<WebResourceAnalytics> {
    let requestUrl = this.baseUrl + networkServiceUuid + '/es/resources/analytics/';
    let queryString = this.queryService.getQueryStringFromFiltersAndSearch(queryFilters, searchTerm);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => response.json() as WebResourceAnalytics);
  }

  public getResources(webServiceUuid: string, pageNumber: number = 1, queryFilters: QueryFilter[] = [], queryOrdering: QueryOrdering = null, searchTerm: string = null): Observable<ManyApiResponse<any[]>> {
    let requestUrl = this.baseUrl + webServiceUuid + '/es/resources/';
    let queryString = this.queryService.getQueryStringNew(pageNumber, queryFilters, queryOrdering, searchTerm);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json() as ManyApiResponse<any[]>;
        toReturn.results = this.conversionService.getResponseObjects(toReturn.results);
        return toReturn;
      });
  }

  public getResourcePresentation(networkServiceUuid: string): Observable<PresentationResponse> {
    let requestUrl = this.baseUrl + networkServiceUuid + '/es/resources/';
    return this.presentationService.getPresentationByUrl('webResource', requestUrl);
  }

  public getResourceUrl(networkServiceUuid: string): string {
    return this.baseUrl + networkServiceUuid + '/es/resources/';
  }

  public getWebService(uuid: string): Observable<WebService> {
    return this.wsHttp.get(this.baseUrl + uuid + '/')
      .map(response => WebService.fromObject(response.json()));
  }

  public getWebServices(): Observable<WebService[]> {
    return this.wsHttp.get(this.baseUrl)
      .map(response => WebService.fromObjects(response.json()));
  }

  public getWebServiceScreenshots(uuid: string, pageNumber: number = 1, queryFilters: QueryFilter[] = [], orderField: string = null, orderDirection: string = null): Observable<ManyApiResponse<HttpScreenshot[]>> {
    let requestUrl = this.baseUrl + uuid + '/es/http-screenshots/';
    let queryString = this.queryService.getQueryString(pageNumber, queryFilters, orderField, orderDirection);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => response.json() as ManyApiResponse<HttpScreenshot[]>);
  }

  public getWebServiceTransactionAnalytics(uuid: string, queryFilters: QueryFilter[] = []): Observable<HttpTransactionAnalytics> {
    let requestUrl = this.baseUrl + uuid + '/es/http-transactions/analytics/';
    let queryString = this.queryService.getQueryStringFromFilters(queryFilters);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => response.json() as HttpTransactionAnalytics);
  }

  public getWebServiceTransactions(uuid: string, pageNumber: number = 1, queryFilters: QueryFilter[] = [], orderField: string = null, orderDirection: string = null): Observable<ManyApiResponse<HttpTransaction[]>> {
    let requestUrl = this.baseUrl + uuid + '/es/http-transactions/';
    let queryString = this.queryService.getQueryString(pageNumber, queryFilters, orderField, orderDirection);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => response.json() as ManyApiResponse<HttpTransaction[]>);
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

}
