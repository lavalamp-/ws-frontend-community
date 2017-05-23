import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Organization} from "../../services/api-services/models/organization.class";
import {OrganizationService} from "../../services/api-services/organization.service";
import {Network} from "../../services/api-services/models/network.class";
import {fadeInOut} from "../../animations";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {DetailListService} from "../../components/ws-widgets/detail-list.service";
import {DetailItem} from "../../components/ws-widgets/models/detail-item.interface";
import {ManyApiResponse} from "../../services/api-services/models/responses/many-api-response.interface";
import {DataTableConfiguration} from "../../components/ws-tables/models/data-table-configuration.class";
import {WsTableService} from "../../components/ws-tables/ws-table.service";
import {FormGroup} from "@angular/forms";
import {NotificationsService} from "angular2-notifications";
import {WsNetworkService} from "../../services/api-services/ws-network.service";
import {WsDialogService} from "../../components/ws-dialogs/ws-dialog.service";
import {WsViewstateService} from "../../services/ui-services/ws-viewstate.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";
import {OrganizationPermission} from "../../services/api-services/models/organization-permission.class";
import {DomainName} from "../../services/api-services/models/domain-name.class";
import {WsDomainNameService} from "../../services/api-services/ws-domain-name.service";

@Component({
  selector: 'ws-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap'
  },
  animations: [
    fadeInOut,
  ],
  styles: [':host { width: 100%; }']
})
export class OrganizationDetailsComponent implements OnInit, OnDestroy {

  private domainForm: FormGroup;
  private domainFormErrors: any;
  private domainsApiResponse: ManyApiResponse<DomainName[]>;
  private _currentDomainsPage: number = 1;

  private _currentNetworksPage: number = 1;
  private networkFormErrors: any;
  private networkForm: FormGroup;
  private networksApiResponse: ManyApiResponse<any>;
  private _networks: Network[];
  private networkTableConfiguration: DataTableConfiguration;
  private _organization: Organization;
  private _organizationId: string;
  private organizationDetails: DetailItem[];
  private subscriptions: Subscription[];
  private permissions: OrganizationPermission;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orgService: OrganizationService,
    private wsTitleService: WsTitleService,
    private detailListService: DetailListService,
    private tableService: WsTableService,
    private networkService: WsNetworkService,
    private dialogService: WsDialogService,
    private router: Router,
    private viewstateService: WsViewstateService,
    private breadcrumbsService: WsBreadcrumbsService,
    private notifyService: NotificationsService,
    private domainService: WsDomainNameService,
  ) { }

  private deleteOrganization(): void {
    this.orgService.deleteOrganization(this.organization.uuid)
      .subscribe(_ => this.router.navigate(['../'], {relativeTo: this.activatedRoute}));
  }

  private fetchDomains(): void {
    this.orgService.getDomains(this.organizationId, this.currentDomainsPage)
      .subscribe(response => {
        this.domainsApiResponse = response;
        console.log('Got domains');
        console.log(response);
      });
  }

  private fetchNetworks(): void {
    this.orgService.getNetworks(this.organizationId, this.currentNetworksPage)
      .subscribe(response => {
        this.networksApiResponse = response;
        this.networks = response.results;
      });
  }

  private fetchOrganization(): void {
    this.orgService.getOrganization(this.organizationId)
      .subscribe(
        organization => this.organization = organization,
        err => {
          if (err.status_code == 404) {
            this.router.navigate(['/organizations/']);
          }
        }
      );
  }

  private fetchPermissions(): void {
    this.orgService.getPermissions(this.organizationId)
      .subscribe(permissions => {
        console.log('Got permissions');
        console.log(permissions);
        this.permissions = permissions;
      })
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscriptions = [];
    this.organizationDetails = [];
    this.subscriptions.push(this.activatedRoute.params.subscribe(param => this.organizationId = param['id']));
  }

  private onDeleteDomainClicked(domainUuid: string): void {
    this.domainService.deleteDomainName(domainUuid)
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

  private onDomainEnterPressed(): void {
    if (this.domainForm.valid) {
      this.onNewDomainClicked();
    }
  }

  private onIncludeDomainToggled(event: any): void {
    let domainUuid = event.uuid;
    let state = event.state;
    this.domainService.setDomainNameInclusion(domainUuid, state)
      .subscribe(_ => {
        this.fetchOrganization();
        this.fetchDomains();
      });
  }

  private onIncludeNetworkToggled(event: any): void {
    let networkUuid = event.uuid;
    let state = event.state;
    this.networkService.setNetworkInclusion(networkUuid, state)
      .subscribe(_ => {
        this.fetchOrganization();
        this.fetchNetworks();
      });
  }

  private onManageUsersClicked(): void {
    this.dialogService.showManageUsersDialog(this.organization);
  }

  private onNetworkEnterPressed(): void {
    if (this.networkForm.valid) {
      this.onNewNetworkClicked();
    }
  }

  private onDomainPageChanged(pageNumber: number): void {
    this.currentDomainsPage = pageNumber;
  }

  private onNetworkPageChanged(pageNumber: number): void {
    this.currentNetworksPage = pageNumber;
  }

  private onNewDomainClicked(): void {
    this.domainFormErrors = null;
    console.log('New domain clicked!');
    this.orgService.createDomainForOrganization(this.organizationId, this.domainForm.value.name)
      .subscribe(
        _ => {
          this.fetchOrganization();
          this.fetchDomains();
          this.domainForm.reset();
        },
        error => this.domainFormErrors = error,
      );
  }

  private onNewNetworkClicked(): void {
    this.networkFormErrors = null;
    this.orgService.createNetworkForOrganization(
      this.organizationId,
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

  private onScanOrganizationClicked(): void {
    this.orgService.scanOrganization(this.organizationId)
      .subscribe(_ => {
        this.notifyService.success('Success', 'We\'ve started a scan for your organization.');
        this.fetchOrganization();
      });
  }

  private onSelectOrganizationClicked(): void {
    this.viewstateService.selectedOrganization = this.organization;
    this.router.navigate(['/topography/' + this.organization.uuid]);
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

  get currentDomainsPage(): number {
    return this._currentDomainsPage;
  }

  set currentDomainsPage(newValue: number) {
    this._currentDomainsPage = newValue;
    this.fetchDomains();
  }

  get currentNetworksPage(): number {
    return this._currentNetworksPage;
  }

  set currentNetworksPage(newValue: number) {
    this._currentNetworksPage = newValue;
    this.fetchNetworks();
  }

  get networks(): Network[] {
    return this._networks;
  }

  set networks(newNetworks: Network[]) {
    this._networks = newNetworks;
    this.networkTableConfiguration = this.tableService.buildNetworksTableFromArray(newNetworks);
  }

  get organization(): Organization {
    return this._organization;
  }

  set organization(newOrganization: Organization) {
    this._organization = newOrganization;
    this.wsTitleService.currentTitle = newOrganization.name;
    this.breadcrumbsService.setBreadcrumbsForOrganizationDetails(newOrganization);
    this.organizationDetails = this.detailListService.getOrganizationDetails(newOrganization);
  }

  get organizationId(): string {
    return this._organizationId;
  }

  set organizationId(uuid: string) {
    this._organizationId = uuid;
    this.fetchOrganization();
    this.fetchNetworks();
    this.fetchPermissions();
    this.fetchDomains();
  }

}
