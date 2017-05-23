import {Injectable, Inject} from '@angular/core';
import {QueryFilter} from "./models/requests/query-filter.class";
import {Observable} from "rxjs";
import {ManyApiResponse} from "./models/responses/many-api-response.interface";
import {Network} from "./models/network.class";
import {WsHttpService} from "./ws-http.service";
import {QueryHelperService} from "./query-helper.service";
import {APP_CONFIG} from "../../app.config";
import {PresentationResponse} from "./models/responses/presentation-response.interface";
import {WsPresentationService} from "./ws-presentation.service";

@Injectable()
export class WsNetworkService {

  private _baseUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private queryService: QueryHelperService,
    private presentationService: WsPresentationService,
    @Inject(APP_CONFIG) private config,
  ) {
    this._baseUrl = config.apiUrl + 'networks/';
  }

  public createNetwork(address: string, maskLength: number, name: string, organizationId: string): Observable<Network> {
    let toSend = {
      address: address,
      mask_length: maskLength,
      name: name,
      organization: organizationId
    };
    return this.wsHttp.post(this.baseUrl, toSend)
      .map(response => response.json() as Network);
  }

  public deleteNetwork(uuid: string): Observable<any> {
    return this.wsHttp.delete(this.baseUrl + uuid + '/')
      .map(response => response.json());
  }

  public getNetworks(pageNumber: number = 1, queryFilters: QueryFilter[] = [], orderField: string = null, orderDirection: string = null): Observable<ManyApiResponse<Network[]>> {
    let queryString = this.queryService.getQueryString(pageNumber, queryFilters, orderField, orderDirection);
    let requestUrl = this.baseUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => response.json() as ManyApiResponse<Network[]>);
  }

  public getPresentation(): Observable<PresentationResponse> {
    return this.presentationService.getPresentationByUrl('network', this.baseUrl);
  }

  public setNetworkInclusion(uuid: string, included: boolean): Observable<Network> {
    let toSend = {scanning_enabled: included};
    return this.wsHttp.patch(this.baseUrl + uuid + '/', toSend)
      .map(response => response.json() as Network);
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }

}
