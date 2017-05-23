import {Injectable, Inject} from '@angular/core';
import {WsHttpService} from "./ws-http.service";
import {QueryHelperService} from "./query-helper.service";
import {APP_CONFIG} from "../../app.config";
import {Observable} from "rxjs";
import {PaymentToken} from "./models/payment-token.class";
import {QueryFilter} from "./models/requests/query-filter.class";
import {QueryOrdering} from "./models/requests/query-ordering.class";
import {ManyApiResponse} from "./models/responses/many-api-response.interface";

@Injectable()
export class WsPaymentTokenService {

  private baseUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private queryService: QueryHelperService,
    @Inject(APP_CONFIG) private config
  ) {
    this.baseUrl = config.apiUrl + 'payment-tokens/';
  }

  public createPaymentToken(name: string = null, tokenType: string = null, tokenValue: string = null, cardType: string = null, expMonth: number = null, expYear: number = null, lastFour: string = null): Observable<PaymentToken> {
    let toSend = {
      name: name,
      token_type: tokenType,
      token_value: tokenValue,
      card_type: cardType,
      expiration_month: expMonth,
      expiration_year: expYear,
      card_last_four: lastFour,
    };
    return this.wsHttp.post(this.baseUrl, toSend)
      .map(response => PaymentToken.fromObject(response.json()));
  }

  public deletePaymentToken(tokenUuid: string): Observable<any> {
    let requestUrl = this.baseUrl + tokenUuid + '/';
    return this.wsHttp.delete(requestUrl);
  }

  public getChargeablePaymentTokens(pageNumber: number = 1, queryFilters: QueryFilter[] = [], searchTerm: string = null, queryOrdering: QueryOrdering = null): Observable<ManyApiResponse<PaymentToken[]>> {
    queryFilters.push(new QueryFilter('can_be_charged', 'True', 'Token Can Be Charged'));
    return this.getPaymentTokens(pageNumber, queryFilters, searchTerm, queryOrdering);
  }

  public getPaymentTokens(pageNumber: number = 1, queryFilters: QueryFilter[] = [], searchTerm: string = null, queryOrdering: QueryOrdering = null): Observable<ManyApiResponse<PaymentToken[]>> {
    let queryString = this.queryService.getQueryStringNew(pageNumber, queryFilters, queryOrdering, searchTerm);
    let requestUrl = this.baseUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json() as ManyApiResponse<PaymentToken[]>;
        toReturn.results = PaymentToken.fromObjects(toReturn.results);
        return toReturn;
      })
  }

}
