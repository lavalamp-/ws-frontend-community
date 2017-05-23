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
import {WsDialogService} from "../../components/ws-dialogs/ws-dialog.service";
import {NotificationsService} from "angular2-notifications";
import {FormGroup} from "@angular/forms";
import {PresentationResponse} from "../../services/api-services/models/responses/presentation-response.interface";

@Component({
  selector: 'ws-my-organizations-list',
  templateUrl: './my-organizations-list.component.html',
  styleUrls: ['./my-organizations-list.component.sass'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap',
  },
  animations: [
    fadeInOut,
  ]
})
export class MyOrganizationsListComponent implements OnInit, OnDestroy {

  private formGroup: FormGroup;
  private orgFormErrors: any;
  private subscriptions: Subscription[] = [];
  private _organizations: ManyApiResponse<Organization[]>;
  private _currentPage: number = 1;
  private _queryFilters: QueryFilter[] = [];
  private _queryOrdering: QueryOrdering = null;
  private _searchTerm: string = null;
  private organizationsPresentation: PresentationResponse;

  constructor(
    private viewstateService: WsViewstateService,
    private orgService: OrganizationService,
    private titleService: WsTitleService,
    private breadcrumbsService: WsBreadcrumbsService,
    private dialogService: WsDialogService,
    private notifyService: NotificationsService,
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
    this.fetchOrganizationPresentation();
    this.fetchOrganizations();
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

  private fetchOrganizationPresentation(): void {
    this.orgService.getPresentation()
      .subscribe(presentation => this.organizationsPresentation = presentation);
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

  private onAddOrgClicked(): void {
    this.orgFormErrors = null;
    this.orgService.createOrganization(
      this.formGroup.value.name,
      this.formGroup.value.description,
    ).subscribe(
      _ => {
        this.fetchOrganizations();
        this.formGroup.reset();
      },
      error => this.orgFormErrors = error,
    );
  }

  private onAddOrgEnterPressed(): void {
    if (this.formGroup.valid) {
      this.onAddOrgClicked();
    }
  }

  private onDeleteOrgClicked(organization: Organization): void {
    this.dialogService.showConfirmDeleteOrganizationDialog(organization)
      .subscribe(response => {
        if (response) {
          this.orgService.deleteOrganization(organization.uuid)
            .subscribe(_ => {
              this.notifyService.success('', 'Organization ' + organization.name + ' deleted successfully.');
              this.fetchOrganizations();
            });
        }
      });
  }

  private onExportClicked(): void {
    console.log('Here are things');
    console.log([this.queryFilters, this.queryOrdering, this.searchTerm, this.organizations.filter_fields]);
    console.log(this.organizations);
    this.dialogService.showExportDataDialog(
      this.orgService.baseUrl,
      this.queryFilters,
      this.queryOrdering,
      this.searchTerm,
      this.organizationsPresentation.fields,
    );
    console.log('Export clicked!');
  }

  private onFilterCreated(queryFilter: QueryFilter): void {
    this.addQueryFilter(queryFilter);
  }

  private onOrderingChanged(ordering: QueryOrdering): void {
    this.queryOrdering = ordering;
  }

  private onPageChanged(page: number): void {
    this.currentPage = page;
    this.fetchOrganizations();
  }

  private onQueryFiltersChanged(queryFilters: QueryFilter[]): void {
    this.queryFilters = queryFilters;
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
