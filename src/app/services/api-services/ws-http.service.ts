import {Injectable, Inject} from '@angular/core';
import { Http, Headers, Response} from "@angular/http";
import {Observable, Subject, BehaviorSubject} from "rxjs";
import { AuthService } from "./auth.service";
import {Logger} from "angular2-logger/core";
import {NotificationsService} from "angular2-notifications";
import {ErrorApiResponse} from "./models/responses/error-api-response.interface";
import {APP_CONFIG} from "../../app.config";

@Injectable()
export class WsHttpService {

  authToken: string;
  private outstandingCount: number;
  public isRequestOutstanding: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public outstandingRequestCount: Subject<number> = new BehaviorSubject<number>(0);
  baseApiUrl: string;

  constructor(
    private http: Http,
    private logger: Logger,
    @Inject(APP_CONFIG) private config
  ) {
    this.baseApiUrl = config.apiUrl;
    this.outstandingCount = 0;
  }

  createApiHeaders(headers: Headers) {
    if (this.authToken) {
      headers.append('Authorization', 'Token ' + this.authToken);
    }
  }

  public delete(url): Observable<Response> {
    let headers = new Headers();
    this.createApiHeaders(headers);
    this.incrementOutstandingCount();
    return this.http.delete(url, { headers: headers})
      .catch(error => {
        error = error.json() as ErrorApiResponse;
        this.handleErrorResponse(error);
        return Observable.throw(error);
      })
      .finally(() => this.decrementOutstandingCount());
  }

  public get(url, args: any = {}): Observable<Response> {
    let headers = new Headers();
    this.createApiHeaders(headers);
    this.incrementOutstandingCount();
    args['headers'] = headers;
    return this.http.get(url, args)
      .catch(error => {
        error = error.json() as ErrorApiResponse;
        this.handleErrorResponse(error);
        return Observable.throw(error);
      })
      .finally(() => this.decrementOutstandingCount());
  }

  public patch(url, data): Observable<Response> {
    let headers = new Headers();
    this.createApiHeaders(headers);
    this.incrementOutstandingCount();
    return this.http.patch(url, data, { headers: headers})
      .catch(error => {
        error = error.json() as ErrorApiResponse;
        this.handleErrorResponse(error);
        return Observable.throw(error);
      })
      .finally(() => this.decrementOutstandingCount());
  }

  public post(url, data): Observable<Response> {
    let headers = new Headers();
    this.createApiHeaders(headers);
    this.incrementOutstandingCount();
    return this.http.post(url, data, { headers: headers})
      .catch(error => {
        error = error.json() as ErrorApiResponse;
        this.handleErrorResponse(error);
        return Observable.throw(error);
      })
      .finally(() => this.decrementOutstandingCount());
  }

  public put(url, data): Observable<Response> {
    let headers = new Headers();
    this.createApiHeaders(headers);
    this.incrementOutstandingCount();
    return this.http.put(url, data, { headers: headers})
      .catch(error => {
        error = error.json() as ErrorApiResponse;
        this.handleErrorResponse(error);
        return Observable.throw(error);
      })
      .finally(() => this.decrementOutstandingCount());
  }

  public decrementOutstandingCount() {
    this.outstandingCount--;
    this.emitOutstandingState();
  }

  public incrementOutstandingCount() {
    this.outstandingCount++;
    this.emitOutstandingState();
  }

  private emitOutstandingState() {
    this.outstandingRequestCount.next(this.outstandingCount);
    this.isRequestOutstanding.next(this.outstandingCount > 0);
  }

  private handleErrorResponse(response: ErrorApiResponse): void {
    console.log('Got error');
    console.log(response);
  }

}
