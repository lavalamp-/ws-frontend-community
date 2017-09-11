import {Injectable, Inject} from '@angular/core';
import {WsHttpService} from "./ws-http.service";
import {QueryHelperService} from "./query-helper.service";
import {WsPresentationService} from "./ws-presentation.service";
import {APP_CONFIG} from "../../app.config";
import {Observable} from "rxjs";

@Injectable()
export class WsDnsRecordTypeService {

  private _baseUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private queryService: QueryHelperService,
    private presentationService: WsPresentationService,
    @Inject(APP_CONFIG) private config,
  ) {
    this._baseUrl = config.apiUrl + 'dns-record-types/';
  }

  public deleteDnsRecordType(uuid: string): Observable<any> {
    let requestUrl = this.baseUrl + uuid + '/';
    return this.wsHttp.delete(requestUrl)
      .map(response => response.json());
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

}
