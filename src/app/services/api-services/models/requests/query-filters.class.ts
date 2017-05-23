import {QueryFilter} from "./query-filter.class";

export class QueryFilters {

  private _queryFilterMap: any;

  constructor() {
    this._queryFilterMap = {};
  }

  public addFilter(queryFilter: QueryFilter): void {
    this._queryFilterMap[queryFilter.filterKey] = queryFilter;
  }

  public addFilters(queryFilters: QueryFilter[]): void {
    for (let queryFilter of queryFilters) {
      this.addFilter(queryFilter);
    }
  }

  public createNewFilter(filterKey: string, filterValue: any, label: string): void {
    let newQuery = new QueryFilter(filterKey, filterValue, label);
    this.addFilter(newQuery);
  }

  public removeFilter(filterKey: string) {
    delete this._queryFilterMap[filterKey];
  }

  public toggleFilter(filterKey: string, filterValue: any, label: string): void {
    if (filterKey in this._queryFilterMap) {
      this.removeFilter(filterKey);
    } else {
      this.createNewFilter(filterKey, filterValue, label);
    }
  }

  get queryFilterKeys(): string[] {
    return Object.keys(this._queryFilterMap);
  }

  get queryFilters(): QueryFilter[] {
    let toReturn = [];
    for (let key of Object.keys(this._queryFilterMap)) {
      toReturn.push(this._queryFilterMap[key]);
    }
    return toReturn;
  }

}
