import {Injectable, Inject} from '@angular/core';
import {WsHttpService} from "./ws-http.service";
import {QueryHelperService} from "./query-helper.service";
import {APP_CONFIG} from "../../app.config";
import {Observable} from "rxjs";
import {DomainName} from "./models/domain-name.class";
import {PresentationResponse} from "./models/responses/presentation-response.interface";
import {WsPresentationService} from "./ws-presentation.service";

@Injectable()
export class WsDomainNameService {

  private _baseUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private queryService: QueryHelperService,
    private presentationService: WsPresentationService,
    @Inject(APP_CONFIG) private config,
  ) {
    this._baseUrl = config.apiUrl + 'domain-names/';
  }

  public deleteDomainName(uuid: string): Observable<any> {
    return this.wsHttp.delete(this.baseUrl + uuid + '/')
      .map(response => response.json());
  }

  public getPresentation(): Observable<PresentationResponse> {
    return this.presentationService.getPresentationByUrl('domainName', this.baseUrl);
  }

  public setDomainNameInclusion(uuid: string, included: boolean): Observable<DomainName> {
    let toSend = {scanning_enabled: included};
    return this.wsHttp.patch(this.baseUrl + uuid + '/', toSend)
      .map(response => response.json() as DomainName);
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }

}
