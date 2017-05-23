import {QueryOrdering} from "./query-ordering.class";
import {QueryArgument} from "./query-argument.class";
import {QueryFilters} from "./query-filters.class";
import {QueryFilter} from "./query-filter.class";

export class QueryHelper {

  private _ordering: QueryOrdering;
  private _page: number;
  private _addedArguments: QueryArgument[];
  private _filters: QueryFilters;
  private _searchTerm: string;
  private _exportType: string;
  private _includedFields: string[];

  constructor() {
    this._addedArguments = [];
    this._filters = new QueryFilters();
    this._includedFields = [];
  }

  public addArgument(key: string, value: any): void {
    this._addedArguments.push(new QueryArgument(key, value));
  }

  public addFilter(queryFilter: QueryFilter): void {
    this._filters.addFilter(queryFilter);
  }

  public addFilters(queryFilters: QueryFilter[]): void {
    this._filters.addFilters(queryFilters);
  }

  public addIncludedField(field: string): void {
    this._includedFields.push(field);
  }

  public createNewFilter(filterKey: string, filterValue: string, label: string): void {
    this._filters.createNewFilter(filterKey, filterValue, label);
  }

  public getAllArguments(orderKey: string, pageKey: string, searchKey: string, exportKey: string, includeFieldsKey: string): QueryArgument[] {
    let allArguments: QueryArgument[] = [];
    if (this._ordering) {
      allArguments.push(this._ordering.toQueryArgument(orderKey));
    }
    if (this._page) {
      allArguments.push(new QueryArgument(pageKey, this._page));
    }
    for (let addedArgument of this._addedArguments) {
      allArguments.push(addedArgument);
    }
    for (let filter of this.queryFilters) {
      allArguments.push(new QueryArgument(filter.filterKey, filter.filterValue));
    }
    if (this.searchTerm) {
      allArguments.push(new QueryArgument(searchKey, this.searchTerm));
    }
    if (this.exportType) {
      allArguments.push(new QueryArgument(exportKey, this.exportType));
    }
    if (this._includedFields.length > 0) {
      allArguments.push(new QueryArgument(includeFieldsKey, this._includedFields.join(',')));
    }
    return allArguments;
  }

  public getQueryString(orderKey: string, pageKey: string, searchKey: string, exportKey: string, includeFieldsKey: string): string {
    let queryStringComponents = [];
    for (let queryArgument of this.getAllArguments(orderKey, pageKey, searchKey, exportKey, includeFieldsKey)) {
      queryStringComponents.push(queryArgument.queryTuple);
    }
    return queryStringComponents.join('&');
  }

  public orderBy(orderField: string, orderDirection?: string): void {
    this._ordering = new QueryOrdering(orderField, orderDirection);
  }

  public removeFilter(filterKey: string) {
    this._filters.removeFilter(filterKey);
  }

  public toggleFilter(filterKey: string, filterValue: any, label: string): void {
    this._filters.toggleFilter(filterKey, filterValue, label);
  }

  get addedArguments(): QueryArgument[] {
    return this._addedArguments;
  }

  get exportType(): string {
    return this._exportType;
  }

  set exportType(newValue: string) {
    this._exportType = newValue;
  }

  get includedFields(): string[] {
    return this._includedFields;
  }

  set includedFields(fields: string[]) {
    this._includedFields = fields;
}

  set page(newValue: number) {
    this._page = newValue;
  }

  get queryFilterKeys(): string[] {
    return this._filters.queryFilterKeys;
  }

  get queryFilters(): QueryFilter[] {
    return this._filters.queryFilters;
  }

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(newValue: string) {
    this._searchTerm = newValue;
  }

}
