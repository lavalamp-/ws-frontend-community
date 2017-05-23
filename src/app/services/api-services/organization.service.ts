import {Injectable, Inject} from '@angular/core';
import { Organization } from "./models/organization.class";
import {Observable} from "rxjs";
import {WsHttpService} from "./ws-http.service";
import {Response, ResponseContentType} from "@angular/http";
import {APP_CONFIG} from "../../app.config";
import { ApiResponse } from './models/responses/api-response.interface';
import {Network} from "./models/network.class";
import {WsCacheService} from "../data-services/ws-cache.service";
import { ApiResponseService } from "./api-response.service";
import {DomainName} from "./models/domain-name.class";
import {ManyApiResponse} from "./models/responses/many-api-response.interface";
import {WebService} from "./models/web-service.interface";
import {QueryHelperService} from "./query-helper.service";
import {WebTechReport} from "./models/es/web-tech-report.interface";
import {HttpTransactionAnalytics} from "./models/analytics/http-transaction-analytics.interface";
import {HttpScreenshot} from "./models/es/http-screenshot.interface";
import {QueryFilter} from "./models/requests/query-filter.class";
import {WsNetworkService} from "./ws-network.service";
import {WebServiceAnalytics} from "./models/analytics/web-service-analytics.class";
import {OrganizationPermission} from "./models/organization-permission.class";
import {SslSupport} from "./models/ssl-support.class";
import {SslSupportAnalytics} from "./models/analytics/ssl-support-analytics.class";
import {DownloadHelperService} from "../data-services/download-helper.service";
import {QueryOrdering} from "./models/requests/query-ordering.class";
import {Order} from "./models/order.class";
import {PresentationResponse} from "./models/responses/presentation-response.interface";
import {WsPresentationService} from "./ws-presentation.service";

@Injectable()
export class OrganizationService {

  private _baseUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private cacheService: WsCacheService,
    private apiResponseService: ApiResponseService,
    private queryService: QueryHelperService,
    private networkService: WsNetworkService,
    private downloadHelper: DownloadHelperService,
    private presentationService: WsPresentationService,
  @Inject(APP_CONFIG) private config
  ) {
    this._baseUrl = config.apiUrl + 'organizations/';
  }

  public addUser(orgUuid: string, userEmail: string): Observable<OrganizationPermission[]> {
    let toSend = {
      operation: 'add_user',
      user_email: userEmail
    };
    return this.wsHttp.patch(this.baseUrl + orgUuid + '/users/', toSend)
      .map(response => response.json() as OrganizationPermission[]);
  }

  public createDomainForOrganization(uuid: string, name: string): Observable<DomainName> {
    let requestUrl = this.baseUrl + uuid + '/domain-names/';
    let toSend = {
      organization: uuid,
      name: name
    };
    return this.wsHttp.post(requestUrl, toSend)
      .map(response => {
        console.log('Got response from create domain.');
        console.log(response);
        return response.json() as DomainName;
      });
  }

  public createNetworkForOrganization(uuid: string, name: string, address: string, maskLength: number): Observable<Network> {
    let requestUrl = this.baseUrl + uuid + '/networks/';
    let toSend = {
      address: address,
      mask_length: maskLength,
      name: name,
      organization: uuid,
    };
    return this.wsHttp.post(requestUrl, toSend)
      .map(response => response.json() as Network);
  }

  public createOrderForOrganization(orgUuid: string, tokenUuid: string): Observable<Order> {
    let toSend = {payment_token: tokenUuid};
    let requestUrl = this.baseUrl + orgUuid + '/orders/';
    return this.wsHttp.post(requestUrl, toSend)
      .map(response => Order.fromObject(response.json()));
  }

  public createOrganization(name: string, description: string): Observable<Organization> {
    let toSend = {
      name: name,
      description: description
    };
    return this.wsHttp.post(this.baseUrl, toSend)
      .map(response => response.json() as Organization);
  }

  public deleteOrganization(uuid: string): Observable<any> {
    return this.wsHttp.delete(this.baseUrl + uuid + '/')
      .map(response => response.json());
  }

  public exportDomainNames(orgUuid: string, queryFilters: QueryFilter[] = [], exportType: string, searchTerm: string = null, queryOrdering: QueryOrdering = null): void {
    let requestUrl = this.baseUrl + orgUuid + '/domain-names/';
    let queryString = this.queryService.getExportQueryString(exportType, queryFilters, searchTerm, queryOrdering);
    requestUrl = requestUrl + '?' + queryString;
    this.wsHttp.get(requestUrl, {responseType: ResponseContentType.Blob})
      .subscribe(response => this.downloadHelper.downloadFileFromResponse(response));
  }

  public exportNetworks(orgUuid: string, queryFilters: QueryFilter[] = [], exportType: string, searchTerm: string = null, queryOrdering: QueryOrdering = null): void {
    let requestUrl = this.baseUrl + orgUuid + '/networks/';
    let queryString = this.queryService.getExportQueryString(exportType, queryFilters, searchTerm, queryOrdering);
    requestUrl = requestUrl + '?' + queryString;
    this.wsHttp.get(requestUrl, {responseType: ResponseContentType.Blob})
      .subscribe(response => this.downloadHelper.downloadFileFromResponse(response));
  }

  public exportOrganizations(queryFilters: QueryFilter[] = [], exportType: string, searchTerm: string = null, queryOrdering: QueryOrdering = null): void {
    let queryString = this.queryService.getExportQueryString(exportType, queryFilters, searchTerm, queryOrdering);
    let requestUrl = this.baseUrl + '?' + queryString;
    this.wsHttp.get(requestUrl, {responseType: ResponseContentType.Blob})
      .subscribe(response => this.downloadHelper.downloadFileFromResponse(response));
  }

  public exportSslSupport(uuid: string, queryFilters: QueryFilter[] = [], exportType: string, searchTerm: string = null, queryOrdering: QueryOrdering = null): void {
    let requestUrl = this.baseUrl + uuid + '/ssl-support/';
    let queryString = this.queryService.getExportQueryString(exportType, queryFilters, searchTerm, queryOrdering);
    requestUrl = requestUrl + '?' + queryString;
    this.wsHttp.get(requestUrl, {responseType: ResponseContentType.Blob})
      .subscribe(response => this.downloadHelper.downloadFileFromResponse(response));
  }

  public exportWebApps(uuid: string, queryFilters: QueryFilter[] = [], exportType: string, searchTerm: string = null, queryOrdering: QueryOrdering = null): void {
    let requestUrl = this.baseUrl + uuid + '/web-services/';
    let queryString = this.queryService.getExportQueryString(exportType, queryFilters, searchTerm, queryOrdering);
    requestUrl = requestUrl + '?' + queryString;
    this.wsHttp.get(requestUrl, {responseType: ResponseContentType.Blob})
      .subscribe(response => this.downloadHelper.downloadFileFromResponse(response));
  }

  public getDomains(uuid: string, pageNumber: number = 1, queryFilters: QueryFilter[] = [], orderField: string = null, orderDirection: string = null): Observable<ManyApiResponse<DomainName[]>> {
    let requestUrl = this.baseUrl + uuid + '/domain-names/';
    let queryString = this.queryService.getQueryString(pageNumber, queryFilters, orderField, orderDirection);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => response.json() as ManyApiResponse<DomainName[]>);
  }

  public getDomainsUrl(orgUuid: string): string {
    return this.baseUrl + orgUuid + '/domain-names/';
  }

  public getDomainsNew(orgUuid: string, pageNumber: number = 1, queryFilters: QueryFilter[] = [], queryOrdering: QueryOrdering = null, searchTerm: string = null): Observable<ManyApiResponse<DomainName[]>> {
    let requestUrl = this.baseUrl + orgUuid + '/domain-names/';
    let queryString = this.queryService.getQueryStringNew(pageNumber, queryFilters, queryOrdering, searchTerm);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json();
        toReturn.results = DomainName.fromObjects(toReturn.results);
        return toReturn;
      });
  }

  public getDomainsUploadUrl(uuid: string): string {
    return this.baseUrl + uuid + '/domain-names/upload/';
  }

  public getNetworks(uuid: string, pageNumber: number = 1, queryFilters: QueryFilter[] = [], orderField: string = null, orderDirection: string = null): Observable<ManyApiResponse<Network[]>> {
    let requestUrl = this.baseUrl + uuid + '/networks/';
    let queryString = this.queryService.getQueryString(pageNumber, queryFilters, orderField, orderDirection);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => response.json() as ManyApiResponse<Network[]>);
  }

  public getNetworksUrl(orgUuid: string): string {
    return this.baseUrl + orgUuid + '/networks/';
  }

  public getNetworksNew(orgUuid: string, pageNumber: number = 1, queryFilters: QueryFilter[] = [], queryOrdering: QueryOrdering = null, searchTerm: string = null): Observable<ManyApiResponse<Network[]>> {
    let requestUrl = this.baseUrl + orgUuid + '/networks/';
    let queryString = this.queryService.getQueryStringNew(pageNumber, queryFilters, queryOrdering, searchTerm);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json();
        toReturn.results = Network.fromObjects(toReturn.results);
        return toReturn;
      });
  }

  public getNetworksUploadUrl(uuid: string): string {
    return this.baseUrl + uuid + '/networks/upload/';
  }

  public getOrganization(uuid: string): Observable<Organization> {
    return this.wsHttp.get(this.baseUrl + uuid + '/')
      .map(response => Organization.fromObject(response.json()));
  }

  public getOrganizations(pageNumber: number = 1, queryFilters: QueryFilter[] = [], orderField: string = null, orderDirection: string = null): Observable<ManyApiResponse<Organization[]>> {
    let queryString = this.queryService.getQueryString(pageNumber, queryFilters, orderField, orderDirection);
    let requestUrl = this.baseUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json() as ManyApiResponse<Organization[]>;
        this.cacheService.cacheOrganizations(toReturn.results);
        return toReturn;
      });
  }

  public getOrganizationsNew(pageNumber: number = 1, queryFilters: QueryFilter[] = [], searchTerm: string = null, queryOrdering: QueryOrdering = null): Observable<ManyApiResponse<Organization[]>> {
    let queryString = this.queryService.getQueryStringNew(pageNumber, queryFilters, queryOrdering, searchTerm);
    let requestUrl = this.baseUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json() as ManyApiResponse<Organization[]>;
        toReturn.results = Organization.fromObjects(toReturn.results);
        return toReturn;
      });
  }

  public getPermissions(uuid: string): Observable<OrganizationPermission> {
    return this.wsHttp.get(this.baseUrl + uuid + '/permissions/')
      .map(response => response.json() as OrganizationPermission);
  }

  public getPresentation(): Observable<PresentationResponse> {
    return this.presentationService.getPresentationByUrl('organization', this.baseUrl);
  }

  public getSslSupport(uuid: string, pageNumber: number = 1, queryFilters: QueryFilter[] = [], searchTerm: string = null, queryOrdering: QueryOrdering = null): Observable<ManyApiResponse<SslSupport[]>> {
    let requestUrl = this.baseUrl + uuid + '/ssl-support/';
    let queryString = this.queryService.getQueryStringNew(pageNumber, queryFilters, queryOrdering, searchTerm);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json() as ManyApiResponse<SslSupport[]>;
        toReturn.results = SslSupport.fromObjects(toReturn.results);
        return toReturn;
      });
  }

  public getSslSupportAnalytics(uuid: string, queryFilters: QueryFilter[] = [], searchTerm: string = null): Observable<SslSupportAnalytics> {
    let requestUrl = this.baseUrl + uuid + '/ssl-support/analytics/';
    let queryString = this.queryService.getQueryStringFromFiltersAndSearch(queryFilters, searchTerm);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let data = response.json();
        return SslSupportAnalytics.fromObject(data);
      });
  }

  public getSslSupportExportUrl(orgUuid: string): string {
    return this.baseUrl + orgUuid + '/ssl-support/';
  }

  public getUserPermissions(uuid: string): Observable<OrganizationPermission[]> {
    return this.wsHttp.get(this.baseUrl + uuid + '/users/')
      .map(response => OrganizationPermission.fromObjects(response.json()));
  }

  public getWebServices(uuid: string, pageNumber: number = 1, queryFilters: QueryFilter[] = [], orderField: string = null, orderDirection: string = null): Observable<ManyApiResponse<WebService[]>> {
    let requestUrl = this.baseUrl + uuid + '/web-services/';
    let queryString = this.queryService.getQueryString(pageNumber, queryFilters, orderField, orderDirection);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json() as ManyApiResponse<WebService[]>;
        toReturn.results = WebService.fromObjects(toReturn.results);
        return toReturn;
      });
  }

  public getWebServicesNew(uuid: string, pageNumber: number = 1, queryFilters: QueryFilter[] = [], searchTerm: string = null, queryOrdering: QueryOrdering = null): Observable<ManyApiResponse<WebService[]>> {
    let requestUrl = this.baseUrl + uuid + '/web-services/';
    let queryString = this.queryService.getQueryStringNew(pageNumber, queryFilters, queryOrdering, searchTerm);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json() as ManyApiResponse<WebService[]>;
        toReturn.results = WebService.fromObjects(toReturn.results);
        return toReturn;
      });
  }

  public getWebServicesExportUrl(orgUuid: string): string {
    return this.baseUrl + orgUuid + '/web-services/';
  }

  public getWebServiceAnalytics(uuid: string, queryFilters: QueryFilter[] = [], searchTerm: string = null): Observable<WebServiceAnalytics> {
    let requestUrl = this.baseUrl + uuid + '/web-services/analytics/';
    let queryString = this.queryService.getQueryStringFromFiltersAndSearch(queryFilters, searchTerm);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => response.json() as WebServiceAnalytics);
  }

  public getWebServiceAnalyticsNew(uuid: string, queryFilters: QueryFilter[] = [], searchTerm: string = null): Observable<WebServiceAnalytics> {
    let requestUrl = this.baseUrl + uuid + '/web-services/analytics/';
    let queryString = this.queryService.getQueryStringFromFiltersAndSearch(queryFilters, searchTerm);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let data = response.json();
        return WebServiceAnalytics.fromObject(data);
      });
  }

  public getWebServiceScreenshots(uuid: string, pageNumber = 1, queryFilters: QueryFilter[] = []): Observable<ManyApiResponse<HttpScreenshot[]>> {
    let requestUrl = this.baseUrl + uuid + '/web-screenshots/';
    let queryString = this.queryService.getQueryString(pageNumber, queryFilters);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => response.json() as ManyApiResponse<HttpScreenshot[]>)
  }

  public getWebTechReportAnalytics(uuid: string, queryFilters: QueryFilter[] = []): Observable<WebTechReport> {
    let requestUrl = this.baseUrl + uuid + '/web-tech-reports/analytics/';
    let queryString = this.queryService.getQueryStringFromFilters(queryFilters);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => response.json() as WebTechReport);
  }

  public getWebTransactionAnalytics(uuid: string, queryFilters: QueryFilter[] = []): Observable<HttpTransactionAnalytics> {
    let requestUrl = this.baseUrl + uuid + '/web-transactions/analytics/';
    let queryString = this.queryService.getQueryStringFromFilters(queryFilters);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => response.json() as HttpTransactionAnalytics);
  }

  public removeUser(orgUuid: string, userUuid: string): Observable<OrganizationPermission[]> {
    let toSend = {
      operation: 'remove_user',
      user_uuid: userUuid
    };
    return this.wsHttp.patch(this.baseUrl + orgUuid + '/users/', toSend)
      .map(response => response.json() as OrganizationPermission[]);
  }

  public scanOrganization(uuid: string): Observable<any> {
    return this.wsHttp.put(this.baseUrl + uuid + '/scan/', {});
  }

  public updateOrganization(uuid: string, name: string): Observable<Organization> {
    let requestUrl = this.baseUrl + uuid + '/';
    let toSend = {
      name: name
    };
    return this.wsHttp.patch(requestUrl, toSend)
      .map(response => response.json() as Organization);
  }

  public updateUserPermissions(orgUuid: string, userUuid: string, permissionsLevel: string): Observable<OrganizationPermission[]> {
    let toSend = {
      operation: 'update_user',
      user_uuid: userUuid,
      permission_level: permissionsLevel
    };
    return this.wsHttp.patch(this.baseUrl + orgUuid + '/users/', toSend)
      .map(response => response.json() as OrganizationPermission[]);
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }

}
