import {Inject, Injectable} from '@angular/core';
import {WsHttpService} from "./ws-http.service";
import {APP_CONFIG} from "../../app.config";
import {Observable} from "rxjs";
import {Organization} from "./models/organization.class";

@Injectable()
export class WsUserService {

  constructor(
    private wsHttp: WsHttpService,
    @Inject(APP_CONFIG) private config,
  ) { }

}
