import {Component, OnInit, OnDestroy} from '@angular/core';
import {fadeInOut} from "../../animations";
import {Subscription} from "rxjs";
import {ManyApiResponse} from "../../services/api-services/models/responses/many-api-response.interface";
import {DomainNameReport} from "../../services/api-services/models/domain-name-report.class";
import {Organization} from "../../services/api-services/models/organization.class";
import {QueryFilter} from "../../services/api-services/models/requests/query-filter.class";
import {QueryOrdering} from "../../services/api-services/models/requests/query-ordering.class";
import {PresentationResponse} from "../../services/api-services/models/responses/presentation-response.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {OrganizationService} from "../../services/api-services/organization.service";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";
import {WsViewstateService} from "../../services/ui-services/ws-viewstate.service";
import {WsDomainNameReportService} from "../../services/api-services/ws-domain-name-report.service";
import {WsDialogService} from "../../components/ws-dialogs/ws-dialog.service";
import {DomainNameReportAnalytics} from "../../services/api-services/models/analytics/domain-name-report-analytics.class";
import {DomainReportsListViewstate} from "../../services/ui-services/models/viewstates/domain-reports-list-viewstate.class";

@Component({
  selector: 'ws-topography-domain-names-list',
  templateUrl: './topography-domain-names-list.component.html',
  styleUrls: ['./topography-domain-names-list.component.sass'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap',
  },
  animations: [
    fadeInOut
  ]
})
export class TopographyDomainNamesListComponent implements OnInit, OnDestroy {

  public domainReportsResponse: ManyApiResponse<DomainNameReport[]>;
  public domainReportAnalytics: DomainNameReportAnalytics;
  private subscriptions: Subscription[] = [];
  private _orgUuid: string;
  private _organization: Organization;
  private _queryFilters: QueryFilter[] = [];
  private _searchTerm: string = null;
  private _queryOrdering: QueryOrdering;
  private _currentPage: number = 1;
  private domainReportPresentation: PresentationResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orgService: OrganizationService,
    private titleService: WsTitleService,
    private breadcrumbsService: WsBreadcrumbsService,
    private viewstateService: WsViewstateService,
    private domainReportService: WsDomainNameReportService,
    private dialogService: WsDialogService,
  ) { }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.titleService.currentTitle = 'Domain Names';
    this.loadViewstate();
    this.subscriptions.push(this.route.params.subscribe(params => this.orgUuid = params['orgId']));
  }

  private addQueryFilter(filter: QueryFilter): void {
    let currentFilters = this.queryFilters.slice(0);
    currentFilters.push(filter);
    this.queryFilters = currentFilters;
  }

  private createQueryFilter(key: string, value: string, label: string): void {
    let newFilter = new QueryFilter(key, value, label);
    let currentFilters = this.queryFilters.slice(0);
    currentFilters.push(newFilter);
    this.queryFilters = currentFilters;
  }

  private fetchAll(): void {
    this.fetchOrganization();
    this.fetchDomainReportPresentation();
    this.fetchAllDomainReports();
  }

  private fetchAllDomainReports(): void {
    this.fetchDomainReports();
    this.fetchDomainReportAnalytics();
  }

  private fetchDomainReportAnalytics(): void {
    this.orgService.getDomainNameReportAnalytics(this.orgUuid, this.queryFilters, this.searchTerm)
      .subscribe(analytics => {
        console.log('Got analytics');
        console.log(analytics);
        this.domainReportAnalytics = analytics;
      })
  }

  private fetchDomainReportPresentation(): void {
    this.domainReportService.getPresentation(this.orgUuid)
      .subscribe(presentation => this.domainReportPresentation = presentation);
  }

  private fetchDomainReports(): void {
    this.orgService.getDomainNameReports(
      this.orgUuid,
      this.currentPage,
      this.queryFilters,
      this.searchTerm,
      this.queryOrdering,
    ).subscribe(response => {
      console.log('Got domain name reports');
      console.log(response);
      this.domainReportsResponse = response;
    })
  }

  private fetchOrganization(): void {
    this.orgService.getOrganization(this.orgUuid)
      .subscribe(
        organization => this.organization = organization,
        error => {
          if (error.status_code == 404) {
            this.router.navigate(['/organizations/mine']);
          }
        }
      )
  }

  private loadViewstate(): void {
    let viewstate = this.viewstateService.getViewstate();
    console.log('Viewstate is ');
    console.log(viewstate);
    if (viewstate) {
      this._queryOrdering = viewstate.queryOrdering;
      this._searchTerm = viewstate.searchTerm;
      this._currentPage = viewstate.page;
      this._queryFilters = viewstate.queryFilters;
    }
  }

  public onAddedByClicked(value: any): void {
    this.createQueryFilter('domain_added_by', value, 'Domain added by ' + value);
  }

  private onExportClicked(): void {
    this.dialogService.showExportDataDialog(
      this.orgService.getDomainReportsExportUrl(this.orgUuid),
      this.queryFilters,
      this.queryOrdering,
      this.searchTerm,
      this.domainReportPresentation.fields,
    );
  }

  private onFilterCreated(filter: QueryFilter): void {
    this.addQueryFilter(filter);
  }

  public onHasResolutionsClicked(value: any): void {
    let title = '';
    if (value) {
      title = 'Domain Has Resolutions';
    } else {
      title = 'Domain Does Not Have Resolutions';
    }
    this.createQueryFilter('has_resolutions', value, title);
  }

  private onPageChanged(page: number): void {
    this.currentPage = page;
    this.fetchDomainReports();
  }

  private onQueryFiltersChanged(queryFilters: QueryFilter[]): void {
    this.queryFilters = queryFilters;
  }

  private onQueryOrderingChanged(ordering: QueryOrdering): void {
    this.queryOrdering = ordering;
  }

  public onRelatedIpsClicked(value: any): void {
    let title = 'Domain resolves to ' + value;
    this.createQueryFilter('related_ips.ip_address', value, title);
  }

  public onResolutionTypeClicked(value: any): void {
    let title = 'Domain has at least one resolution of ' + value + ' type';
    this.createQueryFilter('resolutions.record_type', value, title);
  }

  private onSearchTermChanged(term: string): void {
    this.searchTerm = term;
  }

  private setViewstate(): void {
    this.viewstateService.setViewstate(this.viewstate);
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(newValue: number) {
    this._currentPage = newValue;
    this.setViewstate();
  }

  get organization(): Organization {
    return this._organization;
  }

  set organization(newValue: Organization) {
    this._organization = newValue;
  }

  get orgUuid(): string {
    return this._orgUuid;
  }

  set orgUuid(newValue: string) {
    this._orgUuid = newValue;
    this.breadcrumbsService.setBreadcrumbsForDomainReportsList(newValue);
    this.fetchAll();
  }

  get queryFilters(): QueryFilter[] {
    return this._queryFilters;
  }

  set queryFilters(newValue: QueryFilter[]) {
    this._queryFilters = newValue;
    this.currentPage = 1;
    this.fetchAllDomainReports();
  }

  get queryOrdering(): QueryOrdering {
    return this._queryOrdering;
  }

  set queryOrdering(newValue: QueryOrdering) {
    this._queryOrdering = newValue;
    this.setViewstate();
    this.fetchAllDomainReports();
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(newValue: string) {
    if (newValue == '') {
      this._searchTerm = null;
    } else {
      this._searchTerm = newValue;
    }
    this.setViewstate();
    this.fetchAllDomainReports();
  }

  get viewstate(): DomainReportsListViewstate {
    return new DomainReportsListViewstate(
      this.currentPage,
      this.queryFilters,
      this.queryOrdering,
      this.searchTerm,
    );
  }

}
