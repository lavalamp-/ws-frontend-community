import {Injectable, Inject} from '@angular/core';
import {APP_CONFIG} from "../../app.config";
import {QueryHelper} from "./models/requests/query-helper.class";
import {QueryFilter} from "./models/requests/query-filter.class";
import {QueryOrdering} from "./models/requests/query-ordering.class";

@Injectable()
export class QueryHelperService {

  constructor(
    @Inject(APP_CONFIG) private config
  ) { }

  public getExportQueryString(exportType: string, queryFilters: QueryFilter[] = [], searchTerm: string = null, queryOrdering: QueryOrdering = null, includedFields: string[] = []): string {
    let queryHelper = new QueryHelper();
    if (queryOrdering) {
      queryHelper.orderBy(queryOrdering.orderField, queryOrdering.orderDirection);
    }
    queryHelper.addFilters(queryFilters);
    queryHelper.searchTerm = searchTerm;
    queryHelper.exportType = exportType;
    queryHelper.includedFields = includedFields;
    return queryHelper.getQueryString(this.config.orderingKey, this.config.paginationKey, this.config.searchKey, this.config.exportKey, this.config.includeFieldsKey);
  }

  public getQueryString(page: number = 1, queryFilters: QueryFilter[] = [], orderField: string = null, orderDirection: string = null, searchTerm: string = null): string {
    let queryHelper = new QueryHelper();
    queryHelper.page = page;
    if (orderField != null) {
      queryHelper.orderBy(orderField, orderDirection);
    }
    queryHelper.addFilters(queryFilters);
    queryHelper.searchTerm = searchTerm;
    return queryHelper.getQueryString(this.config.orderingKey, this.config.paginationKey, this.config.searchKey, this.config.exportKey, this.config.includeFieldsKey);
  }

  public getQueryStringNew(page: number = 1, queryFilters: QueryFilter[] = [], queryOrdering: QueryOrdering = null, searchTerm: string = null): string {
    let queryHelper = new QueryHelper();
    queryHelper.page = page;
    if (queryOrdering) {
      queryHelper.orderBy(queryOrdering.orderField, queryOrdering.orderDirection);
    }
    queryHelper.addFilters(queryFilters);
    queryHelper.searchTerm = searchTerm;
    return queryHelper.getQueryString(this.config.orderingKey, this.config.paginationKey, this.config.searchKey, this.config.exportKey, this.config.includeFieldsKey);
  }

  public getQueryStringFromFilters(queryFilters: QueryFilter[]): string {
    let queryHelper = new QueryHelper();
    queryHelper.addFilters(queryFilters);
    return queryHelper.getQueryString(this.config.orderingKey, this.config.paginationKey, this.config.searchKey, this.config.exportKey, this.config.includeFieldsKey);
  }

  public getQueryStringFromFiltersAndSearch(queryFilters: QueryFilter[] = [], searchTerm: string = null): string {
    let queryHelper = new QueryHelper();
    queryHelper.addFilters(queryFilters);
    queryHelper.searchTerm = searchTerm;
    return queryHelper.getQueryString(this.config.orderingKey, this.config.paginationKey, this.config.searchKey, this.config.exportKey, this.config.includeFieldsKey);
  }

  public getQueryStringForPage(page: number): string {
    let queryHelper = new QueryHelper();
    queryHelper.page = page;
    return queryHelper.getQueryString(this.config.orderingKey, this.config.paginationKey, this.config.searchKey, this.config.exportKey, this.config.includeFieldsKey);
  }

  public getQueryStringForPageAndOrder(page: number, orderField?: string, orderDirection?: string): string {
    let queryHelper = new QueryHelper();
    queryHelper.page = page;
    if (orderField) {
      queryHelper.orderBy(orderField, orderDirection);
    }
    return queryHelper.getQueryString(this.config.orderingKey, this.config.paginationKey, this.config.searchKey, this.config.exportKey, this.config.includeFieldsKey);
  }

}
