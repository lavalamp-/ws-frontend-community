import {QueryFilter} from "../../../api-services/models/requests/query-filter.class";
import {QueryOrdering} from "../../../api-services/models/requests/query-ordering.class";

export class OrgDetailsViewstate {

  public networksCurrentPage: number;
  public networksQueryFilters: QueryFilter[];
  public networksQueryOrdering: QueryOrdering;
  public networksSearchTerm: string;
  public domainsCurrentPage: number;
  public domainsQueryFilters: QueryFilter[];
  public domainsQueryOrdering: QueryOrdering;
  public domainsSearchTerm: string;
  public tabIndex: number;

  constructor(
    networksCurrentPage: number = 0,
    networksQueryFilters: QueryFilter[] = [],
    networksQueryOrdering: QueryOrdering = null,
    networksSearchTerm: string = null,
    domainsCurrentPage: number = 0,
    domainsQueryFilters: QueryFilter[] = [],
    domainsQueryOrdering: QueryOrdering = null,
    domainsSearchTerm: string = null,
    tabIndex: number = 0,
  ) {
    this.networksCurrentPage = networksCurrentPage;
    this.networksQueryFilters = networksQueryFilters;
    this.networksQueryOrdering = networksQueryOrdering;
    this.networksSearchTerm = networksSearchTerm;
    this.domainsCurrentPage = domainsCurrentPage;
    this.domainsQueryFilters = domainsQueryFilters;
    this.domainsQueryOrdering = domainsQueryOrdering;
    this.domainsSearchTerm = domainsSearchTerm;
    this.tabIndex = tabIndex;
  }

}
