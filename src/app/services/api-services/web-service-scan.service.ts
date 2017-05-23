import {Injectable, Inject} from '@angular/core';
import {WsHttpService} from "./ws-http.service";
import {APP_CONFIG} from "../../app.config";
import {WebServiceScan} from "./models/web-service-scan.interface";
import {Observable} from "rxjs";
import {HttpTransactionAnalytics} from "./models/analytics/http-transaction-analytics.interface";
import {HttpTransaction} from "./models/es/http-transaction.interface";
import {HttpScreenshot} from "./models/es/http-screenshot.interface";
import {ManyApiResponse} from "./models/responses/many-api-response.interface";
import {QueryHelperService} from "./query-helper.service";
import {WebTechReport} from "./models/es/web-tech-report.interface";
import {WebHeaderReport} from "./models/es/web-header-report.interface";

@Injectable()
export class WebServiceScanService {

  private _baseUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private queryService: QueryHelperService,
    @Inject(APP_CONFIG) private config
  ) {
    this._baseUrl = config.apiUrl + 'web-service-scans/';
  }

  public getHeaderReport(uuid: string): Observable<WebHeaderReport> {
    return this.wsHttp.get(this.baseUrl + uuid + '/header-report/')
      .map(response => response.json() as WebHeaderReport);
  }

  public getScreenshots(uuid: string, pageNumber = 1, orderField?: string, orderDirection?: string): Observable<ManyApiResponse<HttpScreenshot[]>> {
    let requestUrl = this.baseUrl + uuid + '/screenshots/';
    let queryString = this.queryService.getQueryStringForPageAndOrder(pageNumber, orderField, orderDirection);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => response.json() as ManyApiResponse<HttpScreenshot[]>);
  }

  public getTechReport(uuid: string): Observable<WebTechReport> {
    return this.wsHttp.get(this.baseUrl + uuid + '/tech-report/')
      .map(response => response.json() as WebTechReport);
  }

  public getTransactionAnalytics(uuid: string): Observable<HttpTransactionAnalytics> {
    return this.wsHttp.get(this.baseUrl + uuid + '/transactions/analytics/')
      .map(response => response.json() as HttpTransactionAnalytics);
  }

  public getTransactions(uuid: string, pageNumber = 1, orderField?: string, orderDirection?: string): Observable<ManyApiResponse<HttpTransaction[]>> {
    let requestUrl = this.baseUrl + uuid + '/transactions/';
    let queryString = this.queryService.getQueryStringForPageAndOrder(pageNumber, orderField, orderDirection);
    requestUrl = requestUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        console.log('HTTP transactions response');
        console.log(response);
        return response.json() as ManyApiResponse<HttpTransaction[]>;
      });
  }

  public getWebServiceScan(uuid: string): Observable<WebServiceScan> {
    return this.wsHttp.get(this.baseUrl + uuid + '/')
      .map(response => response.json() as WebServiceScan);
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

}
