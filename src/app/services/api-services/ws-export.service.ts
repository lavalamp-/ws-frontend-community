import {Injectable, Inject} from '@angular/core';
import {QueryFilter} from "./models/requests/query-filter.class";
import {QueryOrdering} from "./models/requests/query-ordering.class";
import {Observable} from "rxjs";
import {APP_CONFIG} from "../../app.config";
import {DownloadHelperService} from "../data-services/download-helper.service";
import {QueryHelperService} from "./query-helper.service";
import {WsHttpService} from "./ws-http.service";
import {ResponseContentType} from "@angular/http";

@Injectable()
export class WsExportService {

  constructor(
    @Inject(APP_CONFIG) private config,
    private downloadHelper: DownloadHelperService,
    private queryService: QueryHelperService,
    private wsHttp: WsHttpService,
  ) { }

  public exportData(exportUrl: string, exportType: string, fileName: string, queryFilters: QueryFilter[] = [], queryOrdering: QueryOrdering = null, searchTerm: string = null, includeFields: string[] = []): Observable<any> {
    let queryString = this.queryService.getExportQueryString(exportType, queryFilters, searchTerm, queryOrdering, includeFields);
    let requestUrl = exportUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl, {responseType: ResponseContentType.Blob})
      .map(response => this.downloadHelper.downloadFileFromResponse(response, fileName));
  }

}
