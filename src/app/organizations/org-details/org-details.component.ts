import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Organization} from "../../services/api-services/models/organization.class";
import {OrganizationService} from "../../services/api-services/organization.service";
import {Router, ActivatedRoute} from "@angular/router";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";
import {fadeInOut} from "../../animations";
import {OrgDetailsViewstate} from "../../services/ui-services/models/viewstates/org-details-viewstate.class";
import {WsViewstateService} from "../../services/ui-services/ws-viewstate.service";
import {QueryFilter} from "../../services/api-services/models/requests/query-filter.class";
import {QueryOrdering} from "../../services/api-services/models/requests/query-ordering.class";
import {ManyApiResponse} from "../../services/api-services/models/responses/many-api-response.interface";
import {Network} from "../../services/api-services/models/network.class";
import {NetworkService} from "../../services/api-services/models/network-service.interface";
import {WsNetworkService} from "../../services/api-services/ws-network.service";
import {WsDialogService} from "../../components/ws-dialogs/ws-dialog.service";
import {FormGroup} from "@angular/forms";
import {DomainName} from "../../services/api-services/models/domain-name.class";
import {WsDomainNameService} from "../../services/api-services/ws-domain-name.service";
import {OrganizationPermission} from "../../services/api-services/models/organization-permission.class";
import {AuthService} from "../../services/api-services/auth.service";
import {NotificationsService} from "angular2-notifications";
import {PaymentToken} from "../../services/api-services/models/payment-token.class";
import {WsPaymentTokenService} from "../../services/api-services/ws-payment-token.service";
import {PresentationResponse} from "../../services/api-services/models/responses/presentation-response.interface";

@Component({
  selector: 'ws-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.sass'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap',
  },
  animations: [
    fadeInOut,
  ]
})
export class OrgDetailsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private _orgUuid: string;
  private _organization: Organization;
  private _tabIndex: number = 0;
  private _networksCurrentPage: number = 0;
  private _networksQueryFilters: QueryFilter[] = [];
  private _networksQueryOrdering: QueryOrdering = null;
  private _networksSearchTerm: string = null;
  private _networks: ManyApiResponse<Network[]>;
  private networkForm: FormGroup;
  private networkFormErrors: any;
  private _domainsCurrentPage: number = 0;
  private _domainsQueryFilters: QueryFilter[] = [];
  private _domainsQueryOrdering: QueryOrdering = null;
  private _domainsSearchTerm: string = null;
  private _domains: ManyApiResponse<DomainName[]>;
  private domainNameForm: FormGroup;
  private domainFormErrors: any;
  private _permissions: OrganizationPermission[];
  private userIsAdmin: boolean;
  private userUuid: string;
  private _paymentTokens: ManyApiResponse<PaymentToken[]>;
  private _selectedToken: PaymentToken;
  private userIsEnterprise: boolean;
  private networkPresentation: PresentationResponse;
  private domainPresentation: PresentationResponse;

  constructor(
    private orgService: OrganizationService,
    private router: Router,
    private titleService: WsTitleService,
    private breadcrumbService: WsBreadcrumbsService,
    private route: ActivatedRoute,
    private viewstateService: WsViewstateService,
    private networkService: WsNetworkService,
    private dialogService: WsDialogService,
    private domainsService: WsDomainNameService,
    private authService: AuthService,
    private notifyService: NotificationsService,
    private paymentTokenService: WsPaymentTokenService,
  ) { }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.loadViewstate();
    this.subscriptions.push(this.route.params.subscribe(params => this.orgUuid = params['orgId']));
    this.subscriptions.push(this.authService.userUuid.subscribe(uuid => this.userUuid = uuid));
    this.subscriptions.push(this.authService.isAdmin.subscribe(isAdmin => this.userIsAdmin = isAdmin));
    this.subscriptions.push(this.authService.isEnterpriseUser.subscribe(isEnterprise => this.userIsEnterprise = isEnterprise));
  }

  private addDomainsQueryFilter(queryFilter: QueryFilter): void {
    let currentFilters = this.domainsQueryFilters.slice(0);
    currentFilters.push(queryFilter);
    this.domainsQueryFilters = currentFilters;
  }

  private addNetworksQueryFilter(queryFilter: QueryFilter): void {
    let currentFilters = this.networksQueryFilters.slice(0);
    currentFilters.push(queryFilter);
    this.networksQueryFilters = currentFilters;
  }

  private createDomainsQueryFilter(filterKey: string, filterValue: string, filterLabel: string): void {
    this.addDomainsQueryFilter(new QueryFilter(filterKey, filterValue, filterLabel));
  }

  private createNetworksQueryFilter(filterKey: string, filterValue: string, filterLabel: string): void {
    this.addNetworksQueryFilter(new QueryFilter(filterKey, filterValue, filterLabel));
  }

  private deleteOrganization(): void {
    this.orgService.deleteOrganization(this.orgUuid)
      .subscribe(_ => this.router.navigate(['/organizations/home']));
  }

  private fetchAll(): void {
    this.fetchOrganization();
    this.fetchNetworks();
    this.fetchDomains();
    this.fetchPermissions();
    this.fetchPaymentTokens();
    this.fetchNetworkPresentation();
    this.fetchDomainPresentation();
  }

  private fetchDomainPresentation(): void {
    this.domainsService.getPresentation()
      .subscribe(presentation => this.domainPresentation = presentation);
  }

  private fetchDomains(): void {
    this.orgService.getDomainsNew(
      this.orgUuid,
      this.domainsCurrentPage,
      this.domainsQueryFilters,
      this.domainsQueryOrdering,
      this.domainsSearchTerm,
    )
      .subscribe(domains => this.domains = domains);
  }

  private fetchOrganization(): void {
    this.orgService.getOrganization(this.orgUuid)
      .subscribe(
        organization => this.organization = organization,
        error => {
          if (error.status_code == 404) {
            this.router.navigate(['/organizations/home']);
          }
        }
      )
  }

  private fetchNetworkPresentation(): void {
    this.networkService.getPresentation()
      .subscribe(presentation => this.networkPresentation = presentation);
  }

  private fetchNetworks(): void {
    this.orgService.getNetworksNew(
      this.orgUuid,
      this.networksCurrentPage,
      this.networksQueryFilters,
      this.networksQueryOrdering,
      this.networksSearchTerm,
    )
      .subscribe(networks => this.networks = networks);
  }

  private fetchPaymentTokens(): void {
    this.paymentTokenService.getChargeablePaymentTokens()
      .subscribe(tokens => this.paymentTokens = tokens);
  }

  private fetchPermissions(): void {
    this.orgService.getUserPermissions(this.orgUuid)
      .subscribe(
        permissions => this.permissions = permissions,
        error => this.permissions = null
      );
  }

  private loadViewstate(): void {
    let viewstate = this.viewstateService.getViewstate();
    if (viewstate) {
      this._tabIndex = viewstate.tabIndex;
      this._networksCurrentPage = viewstate.networksCurrentPage;
      this._networksQueryOrdering = viewstate.networksQueryOrdering;
      this._networksQueryFilters = viewstate.networksQueryFilters;
      this._networksSearchTerm = viewstate.networksSearchTerm;
      this._domainsCurrentPage = viewstate.domainsCurrentPage;
      this._domainsQueryOrdering = viewstate.domainsQueryOrdering;
      this._domainsQueryFilters = viewstate.domainsQueryFilters;
      this._domainsSearchTerm = viewstate.domainsSearchTerm;
    }
  }

  private onAddDomainEnterPressed(): void {
    if (this.domainNameForm.valid) {
      this.onNewDomainClicked();
    }
  }

  private onAddNetworkEnterPressed(): void {
    if (this.networkForm.valid) {
      this.onNewNetworkClicked();
    }
  }

  private onAddPaymentClicked(): void {
    this.dialogService.showPaymentMethodsDialog()
      .subscribe(response => {
        if (response) {
          this.fetchPaymentTokens();
        }
      })
  }

  private onCheckOutClicked(): void {
    let selectedUuid;
    if (this.userIsEnterprise) {
      selectedUuid = null;
    } else {
      selectedUuid = this.selectedToken.uuid;
    }
    this.orgService.createOrderForOrganization(this.orgUuid, selectedUuid)
      .subscribe(order => {
        this.router.navigate(['/organizations/' + this.orgUuid + '/check-out/' + order.uuid]);
      });
  }

  private onDeleteDomainClicked(domainUuid: string): void {
    this.domainsService.deleteDomainName(domainUuid)
      .subscribe(_ => {
        this.fetchDomains();
        this.fetchOrganization();
      });
  }

  private onDeleteNetworkClicked(networkUuid: string): void {
    this.networkService.deleteNetwork(networkUuid)
      .subscribe(_ => {
        this.fetchNetworks();
        this.fetchOrganization();
      });
  }

  private onDeleteOrganizationClicked(): void {
    this.dialogService.showConfirmDeleteOrganizationDialog(this.organization)
      .subscribe(result => {
        if (result === true) {
          this.deleteOrganization();
        }
      });
  }

  private onDomainsFilterCreated(queryFilter: QueryFilter): void {
    this.addDomainsQueryFilter(queryFilter);
  }

  private onDomainIncludeToggled(toggle: any): void {
    let domainUuid = toggle[0];
    let include = toggle[1];
    this.domainsService.setDomainNameInclusion(domainUuid, include)
      .subscribe(_ => {
        this.fetchOrganization();
        this.fetchDomains();
      })
  }

  private onDomainsOrderingChanged(ordering: QueryOrdering): void {
    this.domainsQueryOrdering = ordering;
  }

  private onDomainsPageChanged(page: number): void {
    this.domainsCurrentPage = page;
    this.fetchDomains();
  }

  private onDomainsSearchChanged(searchTerm: string): void {
    this.domainsSearchTerm = searchTerm;
  }

  private onExportDomains(): void {
    this.dialogService.showExportDataDialog(
      this.orgService.getDomainsUrl(this.orgUuid),
      this.domainsQueryFilters,
      this.domainsQueryOrdering,
      this.domainsSearchTerm,
      this.domainPresentation.fields,
    );
  }

  private onExportNetworks(): void {
    this.dialogService.showExportDataDialog(
      this.orgService.getNetworksUrl(this.orgUuid),
      this.networksQueryFilters,
      this.networksQueryOrdering,
      this.networksSearchTerm,
      this.networkPresentation.fields,
    );
  }

  private onNetworkIncludeToggled(toggle: any): void {
    let networkUuid = toggle[0];
    let include = toggle[1];
    this.networkService.setNetworkInclusion(networkUuid, include)
      .subscribe(_ => {
        this.fetchOrganization();
        this.fetchNetworks();
      });
  }

  private onNetworksFilterCreated(queryFilter: QueryFilter): void {
    this.addNetworksQueryFilter(queryFilter);
  }

  private onNetworksOrderingChanged(queryOrdering: QueryOrdering): void {
    this.networksQueryOrdering = queryOrdering;
  }

  private onNetworksPageChanged(page: number): void {
    this.networksCurrentPage = page;
    this.fetchNetworks();
  }

  private onNetworksSearchChanged(searchTerm: string): void {
    this.networksSearchTerm = searchTerm;
  }

  private onNewDomainClicked(): void {
    this.domainFormErrors = null;
    this.orgService.createDomainForOrganization(
      this.orgUuid,
      this.domainNameForm.value.name,
    ).subscribe(
      _ => {
        this.fetchOrganization();
        this.fetchDomains();
        this.domainNameForm.reset();
      },
      error => this.domainFormErrors = error,
    )
  }

  private onNewNetworkClicked(): void {
    this.networkFormErrors = null;
    this.orgService.createNetworkForOrganization(
      this.orgUuid,
      this.networkForm.value.name,
      this.networkForm.value.address,
      this.networkForm.value.mask_length,
    ).subscribe(
      _ => {
        this.fetchOrganization();
        this.fetchNetworks();
        this.networkForm.reset();
      },
      error => this.networkFormErrors = error,
    );
  }

  private onPermissionsChanged(event: any): void {
    this.orgService.updateUserPermissions(this.organization.uuid, event[0].user_uuid, event[1])
      .subscribe(
        permissions => this.permissions = permissions,
        error => this.notifyService.error('Error', error.detail)
      );
  }

  private onUploadDomainClicked(): void {
    this.dialogService.showUploadDomainsDialog(this.organization, true)
      .subscribe(result => {
        if (result.new_domains > 0) {
          this.fetchOrganization();
          this.fetchDomains();
        }
      });
  }

  private onUploadNetworkClicked(): void {
    this.dialogService.showUploadNetworksDialog(this.organization, true)
      .subscribe(result => {
        if (result.new_networks > 0) {
          this.fetchOrganization();
          this.fetchNetworks();
        }
      });
  }

  private onUserAdded(userEmail: string): void {
    this.orgService.addUser(this.organization.uuid, userEmail)
      .subscribe(
        permissions => this.permissions = permissions,
        error => this.notifyService.error('Error', error.detail)
      );
  }

  private onUserRemoved(userUuid: string): void {
    this.orgService.removeUser(this.organization.uuid, userUuid)
      .subscribe(
        permissions => this.permissions = permissions,
        error => this.notifyService.error('Error', error.detail)
      );
  }

  private onViewOrganizationClicked(): void {
    this.router.navigate(['/topography/' + this.orgUuid]);
  }

  private setViewstate(): void {
    this.viewstateService.setViewstate(this.viewstate);
  }

  get canUserAdmin(): boolean {
    if (this.userIsAdmin) {
      return true;
    } else if (this.userPermission) {
      return this.userPermission.can_admin;
    } else {
      return false;
    }
  }

  get canUserScan(): boolean {
    if (this.userIsAdmin) {
      return true;
    } else if (this.userPermission) {
      return this.userPermission.can_scan;
    } else {
      return false;
    }
  }

  get canUserWrite(): boolean {
    if (this.userIsAdmin) {
      return true;
    } else if (this.userPermission) {
      return this.userPermission.can_write;
    } else {
      return false;
    }
  }

  get domains(): ManyApiResponse<DomainName[]> {
    return this._domains;
  }

  set domains(domains: ManyApiResponse<DomainName[]>) {
    this._domains = domains;
    console.log('Got domains');
    console.log(domains);
  }

  get domainsCurrentPage(): number {
    return this._domainsCurrentPage;
  }

  set domainsCurrentPage(newValue: number) {
    this._domainsCurrentPage = newValue;
    this.setViewstate();
  }

  get domainsQueryFilters(): QueryFilter[] {
    return this._domainsQueryFilters;
  }

  set domainsQueryFilters(filters: QueryFilter[]) {
    this._domainsQueryFilters = filters;
    this.setViewstate();
    this.fetchDomains();
  }

  get domainsQueryOrdering(): QueryOrdering {
    return this._domainsQueryOrdering;
  }

  set domainsQueryOrdering(ordering: QueryOrdering) {
    this._domainsQueryOrdering = ordering;
    this.setViewstate();
    this.fetchDomains();
  }

  get domainsSearchTerm(): string {
    return this._domainsSearchTerm;
  }

  set domainsSearchTerm(term: string) {
    this._domainsSearchTerm = term;
    this.setViewstate();
    this.fetchDomains();
  }

  get networks(): ManyApiResponse<Network[]> {
    return this._networks;
  }

  set networks(networks: ManyApiResponse<Network[]>) {
    this._networks = networks;
    console.log('Got networks');
    console.log(networks);
  }

  get networksCurrentPage(): number {
    return this._networksCurrentPage;
  }

  set networksCurrentPage(newValue: number) {
    this._networksCurrentPage = newValue;
    this.setViewstate();
  }

  get networksQueryFilters(): QueryFilter[] {
    return this._networksQueryFilters;
  }

  set networksQueryFilters(queryFilters: QueryFilter[]) {
    this._networksQueryFilters = queryFilters;
    this.setViewstate();
    this.fetchNetworks();
  }

  get networksQueryOrdering(): QueryOrdering {
    return this._networksQueryOrdering;
  }

  set networksQueryOrdering(ordering: QueryOrdering) {
    this._networksQueryOrdering = ordering;
    this.setViewstate();
    this.fetchNetworks();
  }

  get networksSearchTerm(): string {
    return this._networksSearchTerm;
  }

  set networksSearchTerm(newValue: string) {
    this._networksSearchTerm = newValue;
    this.setViewstate();
    this.fetchNetworks();
  }

  get organization(): Organization {
    return this._organization;
  }

  set organization(newValue: Organization) {
    this._organization = newValue;
    this.titleService.currentTitle = this._organization.name;
    this.breadcrumbService.setBreadcrumbsForOrganizationDetails(this._organization);
    console.log('got organization');
    console.log(newValue);
  }

  get orgUuid(): string {
    return this._orgUuid;
  }

  set orgUuid(newValue: string) {
    this._orgUuid = newValue;
    console.log('Org UUID is ' + newValue);
    this.fetchAll();
  }

  get paymentRequired(): boolean {
    if (!this.paymentTokens) {
      return true;
    } else if (!this.organization) {
      return true;
    } else if (this.userIsEnterprise) {
      return false;
    } else {
      return this.organization.current_order_tier_name != 'micro';
    }
  }

  get paymentTokens(): ManyApiResponse<PaymentToken[]> {
    return this._paymentTokens;
  }

  set paymentTokens(tokens: ManyApiResponse<PaymentToken[]>) {
    this._paymentTokens = tokens;
    console.log('got tokens');
    console.log(tokens);
  }

  get permissions(): OrganizationPermission[] {
    return this._permissions;
  }

  set permissions(permissions: OrganizationPermission[]) {
    this._permissions = permissions;
    console.log('Got permissions');
    console.log(permissions);
  }

  get scanButtonEnabled(): boolean {
    if (!this.organization) {
      return false;
    } else if (!this.organization.ready_for_scan) {
      return false;
    } else {
      if (this.paymentRequired && !this.selectedToken) {
        return false;
      } else if (this.paymentRequired && !this.selectedToken.can_be_charged) {
        return false;
      } else if (this.organization.current_order_tier_name == 'enterprise' && !this.userIsEnterprise) {
        return false;
      } else {
        return true;
      }
    }
  }

  get selectedToken(): PaymentToken {
    return this._selectedToken;
  }

  set selectedToken(token: PaymentToken) {
    this._selectedToken = token;
    console.log('Token selected');
    console.log(token);
  }

  get tabIndex(): number {
    return this._tabIndex;
  }

  set tabIndex(newValue: number) {
    this._tabIndex = newValue;
    this.setViewstate();
  }

  get userPermission(): OrganizationPermission {
    if (this.permissions) {
      for (let permission of this.permissions) {
        if (permission.user_uuid == this.userUuid) {
          return permission;
        }
      }
      return null;
    } else {
      return null;
    }
  }

  get viewstate(): OrgDetailsViewstate {
    return new OrgDetailsViewstate(
      this.networksCurrentPage,
      this.networksQueryFilters,
      this.networksQueryOrdering,
      this.networksSearchTerm,
      this.domainsCurrentPage,
      this.domainsQueryFilters,
      this.domainsQueryOrdering,
      this.domainsSearchTerm,
      this.tabIndex,
    );
  }

}
