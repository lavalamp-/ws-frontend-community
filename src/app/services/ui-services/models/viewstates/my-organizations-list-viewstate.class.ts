import {QueryFilter} from "../../../api-services/models/requests/query-filter.class";
import {QueryOrdering} from "../../../api-services/models/requests/query-ordering.class";

export class MyOrganizationsListViewstate {

  public page: number;
  public queryFilters: QueryFilter[];
  public queryOrdering: QueryOrdering;
  public searchTerm: string;

  public constructor(
    page: number = 1,
    queryFilters: QueryFilter[] = [],
    queryOrdering: QueryOrdering = null,
    searchTerm: string = null
  ) {
    this.page = page;
    this.queryFilters = queryFilters;
    this.queryOrdering = queryOrdering;
    this.searchTerm = searchTerm;
  }

}
