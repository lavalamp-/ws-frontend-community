import {QueryFilter} from "../../../api-services/models/requests/query-filter.class";
import {QueryOrdering} from "../../../api-services/models/requests/query-ordering.class";
export class SslSupportDetailsViewstate {

  public locationsPage: number;
  public locationsQueryFilters: QueryFilter[];
  public locationsQueryOrdering: QueryOrdering;
  public locationsSearchTerm: string;
  public relatedPage: number;
  public relatedQueryFilters: QueryFilter[];
  public relatedQueryOrdering: QueryOrdering;
  public relatedSearchTerm: string;
  public tabIndex: number;

  constructor(
    locationsPage: number = 1,
    locationsQueryFilters: QueryFilter[] = [],
    locationsQueryOrdering: QueryOrdering = null,
    locationsSearchTerm: string = null,
    relatedPage: number = 1,
    relatedQueryFilters: QueryFilter[] = [],
    relatedQueryOrdering: QueryOrdering = null,
    relatedSearchTerm: string = null,
    tabIndex: number = 0,
  ) {
    this.locationsPage = locationsPage;
    this.locationsQueryFilters = locationsQueryFilters;
    this.locationsQueryOrdering = locationsQueryOrdering;
    this.locationsSearchTerm = locationsSearchTerm;
    this.relatedPage = relatedPage;
    this.relatedQueryFilters = relatedQueryFilters;
    this.relatedQueryOrdering = relatedQueryOrdering;
    this.relatedSearchTerm = relatedSearchTerm;
    this.tabIndex = tabIndex;
  }

}
