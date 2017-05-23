import {Injectable, Inject} from '@angular/core';
import {WsHttpService} from "./ws-http.service";
import {APP_CONFIG} from "../../app.config";
import {Observable, BehaviorSubject} from "rxjs";
import {PresentationResponse} from "./models/responses/presentation-response.interface";

@Injectable()
export class WsPresentationService {

  private presentationCache: any = {};

  constructor(
    private wsHttp: WsHttpService,
    @Inject(APP_CONFIG) private config,
  ) { }

  public getPresentationByUrl(presentedModel: string, modelUrl: string): Observable<PresentationResponse> {
    if (this.presentationCache.hasOwnProperty(presentedModel)) {
      let toReturn = new BehaviorSubject<PresentationResponse>(this.presentationCache[presentedModel]);
      return toReturn.asObservable();
    } else {
      let requestUrl = modelUrl + '?' + this.config.presentationKey;
      return this.wsHttp.get(requestUrl)
        .map(response => {
          let presentationResponse = response.json() as PresentationResponse;
          this.presentationCache[presentedModel] = presentationResponse;
          return presentationResponse;
        })
    }
  }

}
