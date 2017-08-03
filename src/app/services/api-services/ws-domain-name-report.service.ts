import {Injectable, Inject} from '@angular/core';
import {WsHttpService} from "./ws-http.service";
import {QueryHelperService} from "./query-helper.service";
import {WsConversionService} from "./ws-conversion.service";
import {DownloadHelperService} from "../data-services/download-helper.service";
import {WsPresentationService} from "./ws-presentation.service";
import {APP_CONFIG} from "../../app.config";
import {Observable} from "rxjs";
import {PresentationResponse} from "./models/responses/presentation-response.interface";

@Injectable()
export class WsDomainNameReportService {

  baseUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private queryService: QueryHelperService,
    private conversionService: WsConversionService,
    private downloadHelper: DownloadHelperService,
    private presentationService: WsPresentationService,
    @Inject(APP_CONFIG) private config,
  ) {
    this.baseUrl = config.apiUrl + 'domain-names';
  }

  public getPresentation(orgUuid: string): Observable<PresentationResponse> {
    let requestUrl = this.config.apiUrl + 'organizations/' + orgUuid + '/es/domain-names/';
    return this.presentationService.getPresentationByUrl('domainNameReport', requestUrl);
  }

}
