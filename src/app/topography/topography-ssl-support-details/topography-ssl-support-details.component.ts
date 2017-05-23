import {Component, OnInit, OnDestroy} from '@angular/core';
import {fadeInOut} from "../../animations";
import {Subscription} from "rxjs";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Organization} from "../../services/api-services/models/organization.class";
import {SslSupport} from "../../services/api-services/models/ssl-support.class";
import {OrganizationService} from "../../services/api-services/organization.service";
import {WsSslSupportService} from "../../services/api-services/ws-ssl-support.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";
import {DetailItem} from "../../components/ws-widgets/models/detail-item.interface";
import {DetailListService} from "../../components/ws-widgets/detail-list.service";
import {ManyApiResponse} from "../../services/api-services/models/responses/many-api-response.interface";
import {QueryFilter} from "../../services/api-services/models/requests/query-filter.class";
import {QueryOrdering} from "../../services/api-services/models/requests/query-ordering.class";
import {SslSupportDetailsViewstate} from "../../services/ui-services/models/viewstates/ssl-support-details-viewstate.class";
import {WsViewstateService} from "../../services/ui-services/ws-viewstate.service";
import {PresentationResponse} from "../../services/api-services/models/responses/presentation-response.interface";
import {WsDialogService} from "../../components/ws-dialogs/ws-dialog.service";

@Component({
  selector: 'ws-topography-ssl-support-details',
  templateUrl: './topography-ssl-support-details.component.html',
  styleUrls: ['./topography-ssl-support-details.component.sass'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap',
  },
  animations: [
    fadeInOut,
  ],
})
export class TopographySslSupportDetailsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private _orgUuid: string;
  private _organization: Organization;
  private _networkServiceUuid: string;
  private _sslSupport: SslSupport;
  private certIssuerDetails: DetailItem[];
  private certSubjectDetails: DetailItem[];
  private certValidityDetails: DetailItem[];
  private certFingerprintDetails: DetailItem[];
  private certPublicKeyDetails: DetailItem[];
  private sslv2ProtocolDetails: DetailItem[];
  private sslv3ProtocolDetails: DetailItem[];
  private tlsv1ProtocolDetails: DetailItem[];
  private tlsv11ProtocolDetails: DetailItem[];
  private tlsv12ProtocolDetails: DetailItem[];
  private protocolDetails: DetailItem[];
  private _sslSupportLocations: ManyApiResponse<SslSupport[]>;
  private _currentLocationsPage: number = 1;
  private _locationsSearchTerm: string = null;
  private _locationsQueryOrdering: QueryOrdering;
  private _locationsQueryFilters: QueryFilter[] = [];
  private _tabIndex: number = 0;
  private locationsIndex: number = 3;
  private _currentRelatedPage: number = 1;
  private _relatedSearchTerm: string = null;
  private _relatedQueryOrdering: QueryOrdering;
  private _relatedQueryFilters: QueryFilter[] = [];
  private _sslSupportRelated: ManyApiResponse<any[]>;
  private relatedIndex: number = 4;
  private sslSupportPresentation: PresentationResponse;
  private sslSupportRelatedPresentation: PresentationResponse;

  constructor(
    private titleService: WsTitleService,
    private route: ActivatedRoute,
    private orgService: OrganizationService,
    private router: Router,
    private sslSupportService: WsSslSupportService,
    private breadcrumbsService: WsBreadcrumbsService,
    private detailListService: DetailListService,
    private viewstateService: WsViewstateService,
    private dialogService: WsDialogService,
  ) { }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.loadViewstate();
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.networkServiceUuid = params['serviceId'];
      this.orgUuid = params['orgId'];
    }));
  }

  private addLocationsQueryFilter(filter: QueryFilter): void {
    let currentFilters = this.locationsQueryFilters.slice(0);
    currentFilters.push(filter);
    this.locationsQueryFilters = currentFilters;
  }

  private addRelatedQueryFilter(filter: QueryFilter): void {
    let currentFilters = this.relatedQueryFilters.slice(0);
    currentFilters.push(filter);
    this.relatedQueryFilters = currentFilters;
  }

  private createLocationsQueryFilter(key: string, value: string, label: string): void {
    this.addLocationsQueryFilter(new QueryFilter(key, value, label));
  }

  private createRelatedQueryFilter(key: string, value: string, label: string): void {
    this.addRelatedQueryFilter(new QueryFilter(key, value, label));
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

  private fetchSslSupport(): void {
    this.sslSupportService.getSslSupportDetails(this.networkServiceUuid)
      .subscribe(
        sslSupport => this.sslSupport = sslSupport,
        error => {
          if (error.status_code == 404) {
            if (this.orgUuid) {
              this.router.navigate(['/topography/' + this.orgUuid + '/ssl-support']);
            } else {
              this.router.navigate(['/organizations/mine']);
            }
          }
        }
      )
  }

  private fetchSslSupportLocations(): void {
    let filters = this.locationsQueryFilters.slice(0);
    filters.push(new QueryFilter('cert_md5_digest', this.sslSupport.cert_md5_digest, 'Certificate MD5 Digest Equals ' + this.sslSupport.cert_md5_digest));
    this.orgService.getSslSupport(
      this.orgUuid,
      this.currentLocationsPage,
      filters,
      this.locationsSearchTerm,
      this.locationsQueryOrdering,
    )
      .subscribe(apiResponse => this.sslSupportLocations = apiResponse);
  }

  private fetchSslSupportPresentation(): void {
    this.sslSupportService.getPresentation(this.orgUuid)
      .subscribe(presentation => this.sslSupportPresentation = presentation);
  }

  private fetchSslSupportRelated(): void {
    this.sslSupportService.getSslSupportRelated(
      this.sslSupport.network_service_uuid,
      this.currentRelatedPage,
      this.relatedQueryFilters,
      this.relatedSearchTerm,
      this.relatedQueryOrdering,
    )
      .subscribe(apiResponse => this.sslSupportRelated = apiResponse);
  }

  private fetchSslSupportRelatedPresentation(): void {
    this.sslSupportService.getRelatedPresentation(this.networkServiceUuid)
      .subscribe(presentation => this.sslSupportRelatedPresentation = presentation);
  }

  private loadViewstate(): void {
    let viewstate = this.viewstateService.getViewstate();
    console.log('Viewstate is');
    console.log(viewstate);
    if (viewstate) {
      this._currentLocationsPage = viewstate.locationsPage;
      this._locationsQueryFilters = viewstate.locationsQueryFilters;
      this._locationsQueryOrdering = viewstate.locationsQueryOrdering;
      this._locationsSearchTerm = viewstate.locationsSearchTerm;
      this._currentRelatedPage = viewstate.relatedPage;
      this._relatedQueryFilters = viewstate.relatedQueryFilters;
      this._relatedQueryOrdering = viewstate.relatedQueryOrdering;
      this._relatedSearchTerm = viewstate.relatedSearchTerm;
      this._tabIndex = viewstate.tabIndex;
    }
  }

  private onLocationsExportClicked(exportType: string): void {
    let filters = this.locationsQueryFilters.slice(0);
    filters.push(new QueryFilter('cert_md5_digest', this.sslSupport.cert_md5_digest, 'Certificate MD5 Digest Equals ' + this.sslSupport.cert_md5_digest));
    this.dialogService.showExportDataDialog(
      this.orgService.getSslSupportExportUrl(this.orgUuid),
      filters,
      this.locationsQueryOrdering,
      this.locationsSearchTerm,
      this.sslSupportPresentation.fields,
    );
  }

  private onLocationsFilterCreated(queryFilter: QueryFilter): void {
    this.addLocationsQueryFilter(queryFilter);
  }

  private onLocationsOrderingChanged(queryOrdering: QueryOrdering): void {
    this.locationsQueryOrdering = queryOrdering;
  }

  private onLocationsPageChanged(pageNumber: number): void {
    this.currentLocationsPage = pageNumber;
    this.fetchSslSupportLocations();
  }

  private onLocationsSearchTermChanged(term: string): void {
    this.locationsSearchTerm = term;
  }

  private onRelatedExportClicked(): void {
    this.dialogService.showExportDataDialog(
      this.sslSupportService.getRelatedUrl(this.networkServiceUuid),
      this.relatedQueryFilters,
      this.relatedQueryOrdering,
      this.relatedSearchTerm,
      this.sslSupportRelatedPresentation.fields,
    );
  }

  private onRelatedFilterCreated(queryFilter: QueryFilter): void {
    this.addRelatedQueryFilter(queryFilter);
  }

  private onRelatedOrderingChanged(queryOrdering: QueryOrdering): void {
    this.relatedQueryOrdering = queryOrdering;
  }

  private onRelatedPageChanged(pageNumber: number): void {
    this.currentRelatedPage = pageNumber;
    this.fetchSslSupportRelated();
  }

  private onRelatedSearchTermChanged(term: string): void {
    this.relatedSearchTerm = term;
  }

  private onQueryFiltersChanged(queryFilters: QueryFilter[]): void {
    if (this.tabIndex == this.locationsIndex) {
      this.locationsQueryFilters = queryFilters;
    } else if (this.tabIndex == this.relatedIndex) {
      this.relatedQueryFilters = queryFilters;
    } else {
      console.log('Not sure where to add query filters to with tab index of ' + this.tabIndex);
    }
  }

  private setAllDetails(): void {
    this.setCertificateDetails();
  }

  private setCertificateDetails(): void {
    this.certIssuerDetails = this.detailListService.getSslIssuerDetails(this.sslSupport);
    this.certSubjectDetails = this.detailListService.getSslSubjectDetails(this.sslSupport);
    this.certValidityDetails = this.detailListService.getSslValidityDetails(this.sslSupport);
    this.certFingerprintDetails = this.detailListService.getSslFingerprintDetails(this.sslSupport);
    this.certPublicKeyDetails = this.detailListService.getSslPublicKeyDetails(this.sslSupport);
    this.sslv2ProtocolDetails = this.detailListService.getSslv2ProtocolDetails(this.sslSupport);
    this.sslv3ProtocolDetails = this.detailListService.getSslv3ProtocolDetails(this.sslSupport);
    this.tlsv1ProtocolDetails = this.detailListService.getTlsv1ProtocolDetails(this.sslSupport);
    this.tlsv11ProtocolDetails = this.detailListService.getTlsv11ProtocolDetails(this.sslSupport);
    this.tlsv12ProtocolDetails = this.detailListService.getTlsv12ProtocolDetails(this.sslSupport);
    this.protocolDetails = this.detailListService.getSslSummaryDetails(this.sslSupport);
  }

  private setViewstate(): void {
    this.viewstateService.setViewstate(this.viewstate);
  }

  get currentLocationsPage(): number {
    return this._currentLocationsPage;
  }

  set currentLocationsPage(newValue: number) {
    this._currentLocationsPage = newValue;
    this.setViewstate();
  }

  get currentRelatedPage(): number {
    return this._currentRelatedPage;
  }

  set currentRelatedPage(newValue: number) {
    this._currentRelatedPage = newValue;
    this.setViewstate();
  }

  get locationsQueryFilters(): QueryFilter[] {
    return this._locationsQueryFilters;
  }

  set locationsQueryFilters(newValue: QueryFilter[]) {
    this._locationsQueryFilters = newValue;
    this.setViewstate();
    this.fetchSslSupportLocations();
  }

  get locationsQueryOrdering(): QueryOrdering {
    return this._locationsQueryOrdering;
  }

  set locationsQueryOrdering(newValue: QueryOrdering) {
    this._locationsQueryOrdering = newValue;
    this.setViewstate();
    this.fetchSslSupportLocations();
  }

  get locationsSearchTerm(): string {
    return this._locationsSearchTerm;
  }

  set locationsSearchTerm(newValue: string) {
    if (newValue == '') {
      this._locationsSearchTerm = null;
    } else {
      this._locationsSearchTerm = newValue;
    }
    this.setViewstate();
    this.fetchSslSupportLocations();
  }

  get networkServiceUuid(): string {
    return this._networkServiceUuid;
  }

  set networkServiceUuid(newValue: string) {
    this._networkServiceUuid = newValue;
    this.fetchSslSupport();
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
    this.fetchOrganization();
    this.fetchSslSupportPresentation();
    this.fetchSslSupportRelatedPresentation();
  }

  get relatedQueryFilters(): QueryFilter[] {
    return this._relatedQueryFilters;
  }

  set relatedQueryFilters(newFilters: QueryFilter[]) {
    this._relatedQueryFilters = newFilters;
    this.setViewstate();
    this.fetchSslSupportRelated();
  }

  get relatedQueryOrdering(): QueryOrdering {
    return this._relatedQueryOrdering;
  }

  set relatedQueryOrdering(newValue: QueryOrdering) {
    this._relatedQueryOrdering = newValue;
    this.setViewstate();
    this.fetchSslSupportRelated();
  }

  get relatedSearchTerm(): string {
    return this._relatedSearchTerm;
  }

  set relatedSearchTerm(newValue: string) {
    if (newValue == '') {
      this._relatedSearchTerm = null;
    } else {
      this._relatedSearchTerm = newValue;
    }
    this.setViewstate();
    this.fetchSslSupportRelated();
  }

  get sslSupport(): SslSupport {
    return this._sslSupport;
  }

  set sslSupport(newValue: SslSupport) {
    this._sslSupport = newValue;
    this.titleService.currentTitle = 'SSL Support For ' + this._sslSupport.endpoint;
    this.breadcrumbsService.setBreadcrumbsForSslSupportDetails(this.orgUuid, this._sslSupport);
    this.setAllDetails();
    this.fetchSslSupportLocations();
    this.fetchSslSupportRelated();
    console.log('Got SSL support');
    console.log(this._sslSupport);
  }

  get sslSupportLocations(): ManyApiResponse<SslSupport[]> {
    return this._sslSupportLocations;
  }

  set sslSupportLocations(newValue: ManyApiResponse<SslSupport[]>) {
    this._sslSupportLocations = newValue;
    console.log('Got locations');
    console.log(this._sslSupportLocations);
  }

  get sslSupportRelated(): ManyApiResponse<any[]> {
    return this._sslSupportRelated;
  }

  set sslSupportRelated(newValue: ManyApiResponse<any[]>) {
    this._sslSupportRelated = newValue;
    console.log('Got related');
    console.log(newValue);
  }

  get tabIndex(): number {
    return this._tabIndex;
  }

  set tabIndex(newValue: number) {
    this._tabIndex = newValue;
    this.setViewstate();
  }

  get viewstate(): SslSupportDetailsViewstate {
    return new SslSupportDetailsViewstate(
      this.currentLocationsPage,
      this.locationsQueryFilters,
      this.locationsQueryOrdering,
      this.locationsSearchTerm,
      this.currentRelatedPage,
      this.relatedQueryFilters,
      this.relatedQueryOrdering,
      this.relatedSearchTerm,
      this.tabIndex,
    );
  }

  get visibleQueryFilters(): QueryFilter[] {
    if (this.tabIndex == this.locationsIndex) {
      return this.locationsQueryFilters;
    } else if (this.tabIndex == this.relatedIndex) {
      return this.relatedQueryFilters;
    } else {
      return [];
    }
  }

}
