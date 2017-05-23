import {Injectable, Inject} from '@angular/core';
import {WsHttpService} from "./ws-http.service";
import {QueryHelperService} from "./query-helper.service";
import {APP_CONFIG} from "../../app.config";
import {QueryFilter} from "./models/requests/query-filter.class";
import {QueryOrdering} from "./models/requests/query-ordering.class";
import {Observable} from "rxjs";
import {ManyApiResponse} from "./models/responses/many-api-response.interface";
import {Order} from "./models/order.class";

@Injectable()
export class WsOrderService {

  private baseUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private queryService: QueryHelperService,
    @Inject(APP_CONFIG) private config
  ) {
    this.baseUrl = config.apiUrl + 'orders/';
  }

  public getOrder(orderUuid: string): Observable<Order> {
    let requestUrl = this.baseUrl + orderUuid + '/';
    return this.wsHttp.get(requestUrl)
      .map(response => Order.fromObject(response.json()));
  }

  public getOrders(pageNumber: number = 1, queryFilters: QueryFilter[] = [], searchTerm: string = null, queryOrdering: QueryOrdering = null): Observable<ManyApiResponse<Order[]>> {
    let queryString = this.queryService.getQueryStringNew(pageNumber, queryFilters, queryOrdering, searchTerm);
    let requestUrl = this.baseUrl + '?' + queryString;
    return this.wsHttp.get(requestUrl)
      .map(response => {
        let toReturn = response.json() as ManyApiResponse<Order[]>;
        toReturn.results = Order.fromObjects(toReturn.results);
        return toReturn;
      })
  }

  public getPlacedOrders(pageNumber: number = 1, queryFilters: QueryFilter[] = [], searchTerm: string = null, queryOrdering: QueryOrdering = null): Observable<ManyApiResponse<Order[]>> {
    queryFilters.push(new QueryFilter('has_been_charged', 'True', 'Order Has Been Placed'));
    return this.getOrders(pageNumber, queryFilters, searchTerm, queryOrdering);
  }

  public placeOrder(orderUuid: string): Observable<any> {
    let requestUrl = this.baseUrl + orderUuid + '/place/';
    return this.wsHttp.put(requestUrl, {});
  }

}
