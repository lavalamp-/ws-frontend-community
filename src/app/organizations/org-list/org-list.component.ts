import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ManyApiResponse} from "../../services/api-services/models/responses/many-api-response.interface";
import {Organization} from "../../services/api-services/models/organization.class";
import {QueryFilter} from "../../services/api-services/models/requests/query-filter.class";
import {QueryOrdering} from "../../services/api-services/models/requests/query-ordering.class";
import {MyOrganizationsListViewstate} from "../../services/ui-services/models/viewstates/my-organizations-list-viewstate.class";
import {WsViewstateService} from "../../services/ui-services/ws-viewstate.service";
import {OrganizationService} from "../../services/api-services/organization.service";
import {fadeInOut} from "../../animations";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";

@Component({
  selector: 'ws-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.sass'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap',
  },
  animations: [
    fadeInOut,
  ]
})
export class OrgListComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private _organizations: ManyApiResponse<Organization[]>;
  private _currentPage: number = 1;
  private _queryFilters: QueryFilter[] = [];
  private _queryOrdering: QueryOrdering = null;
  private _searchTerm: string = null;

  constructor(
    private viewstateService: WsViewstateService,
    private orgService: OrganizationService,
    private titleService: WsTitleService,
    private breadcrumbsService: WsBreadcrumbsService,
  ) { }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.titleService.currentTitle = 'My Organizations';
    this.breadcrumbsService.setBreadcrumbsForMyOrganizations();
    this.loadViewstate();
    this.fetchOrganizations();
  }

  private fetchOrganizations(): void {
    this.orgService.getOrganizationsNew(
      this.currentPage,
      this.queryFilters,
      this.searchTerm,
      this.queryOrdering,
    ).subscribe(organizations => this.organizations = organizations);
  }

  private loadViewstate(): void {
    let viewstate = this.viewstateService.getViewstate();
    if (viewstate) {
      this._currentPage = viewstate.page;
      this._queryFilters = viewstate.queryFilters;
      this._queryOrdering = viewstate.queryOrdering;
      this._searchTerm = viewstate.searchTerm;
    }
  }

  private setViewstate(): void {
    this.viewstateService.setViewstate(this.viewstate);
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
    this.setViewstate();
  }

  get organizations(): ManyApiResponse<Organization[]> {
    return this._organizations;
  }

  set organizations(organizations: ManyApiResponse<Organization[]>) {
    this._organizations = organizations;
    console.log('Got organizations');
    console.log(organizations);
  }

  get queryFilters(): QueryFilter[] {
    return this._queryFilters;
  }

  set queryFilters(filters: QueryFilter[]) {
    this._queryFilters = filters;
    this.setViewstate();
    this.fetchOrganizations();
  }

  get queryOrdering(): QueryOrdering {
    return this._queryOrdering;
  }

  set queryOrdering(ordering: QueryOrdering) {
    this._queryOrdering = ordering;
    this.setViewstate();
    this.fetchOrganizations();
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(term: string) {
    this._searchTerm = term;
    this.setViewstate();
    this.fetchOrganizations();
  }

  get viewstate(): MyOrganizationsListViewstate {
    return new MyOrganizationsListViewstate(
      this.currentPage,
      this.queryFilters,
      this.queryOrdering,
      this.searchTerm,
    );
  }

}
