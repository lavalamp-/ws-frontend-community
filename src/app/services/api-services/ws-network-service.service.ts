import {Injectable, Inject} from '@angular/core';
import {WsHttpService} from "./ws-http.service";
import {QueryHelperService} from "./query-helper.service";
import {APP_CONFIG} from "../../app.config";

@Injectable()
export class WsNetworkServiceService {

  private baseUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private queryService: QueryHelperService,
    @Inject(APP_CONFIG) private config
  ) {

  }

}
