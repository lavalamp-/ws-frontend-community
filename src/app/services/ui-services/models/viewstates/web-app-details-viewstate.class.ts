import {QueryFilter} from "../../../api-services/models/requests/query-filter.class";
import {QueryOrdering} from "../../../api-services/models/requests/query-ordering.class";

export class WebAppDetailsViewstate {

  public resourcesPage: number;
  public resourcesQueryFilters: QueryFilter[];
  public resourcesQueryOrdering: QueryOrdering;
  public resourcesSearchTerm: string;
  public tabIndex: number;

  constructor(
    resourcesPage: number = 0,
    resourcesQueryFilters: QueryFilter[] = [],
    resourcesQueryOrdering: QueryOrdering = null,
    resourcesSearchTerm: string = null,
    tabIndex: number = 0
  ) {
    this.resourcesPage = resourcesPage;
    this.resourcesQueryFilters = resourcesQueryFilters;
    this.resourcesQueryOrdering = resourcesQueryOrdering;
    this.resourcesSearchTerm = resourcesSearchTerm;
    this.tabIndex = tabIndex;
  }

}
