import {Component, OnInit, OnDestroy} from '@angular/core';
import {fadeInOut} from "../../animations";
import {Subscription} from "rxjs";
import {Organization} from "../../services/api-services/models/organization.class";
import {Order} from "../../services/api-services/models/order.class";
import {OrganizationService} from "../../services/api-services/organization.service";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";
import {Router, ActivatedRoute} from "@angular/router";
import {WsOrderService} from "../../services/api-services/ws-order.service";
import {NotificationsService} from "angular2-notifications";
import {ScanConfig} from "../../services/api-services/models/scan-config.class";
import {WsScanConfigService} from "../../services/api-services/ws-scan-config.service";
import {FormGroup} from "@angular/forms";
import {ManyApiResponse} from "../../services/api-services/models/responses/many-api-response.interface";
import {ScanPort} from "../../services/api-services/models/scan-port.class";
import {WsScanPortService} from "../../services/api-services/ws-scan-port.service";
import {DnsRecordType} from "../../services/api-services/models/dns-record-type.class";
import {WsDnsRecordTypeService} from "../../services/api-services/ws-dns-record-type.service";

@Component({
  selector: 'ws-org-scan-config',
  templateUrl: './org-scan-config.component.html',
  styleUrls: ['./org-scan-config.component.sass'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap',
  },
  animations: [
    fadeInOut,
  ]
})
export class OrgScanConfigComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private _orgUuid: string;
  private _orderUuid: string;
  private _organization: Organization;
  private _order: Order;
  private _scanConfigUuid: string;
  private _scanConfig: ScanConfig;
  public scanConfigFormErrors: any = null;
  private scanConfigStatus: any = null;
  private _scanPorts: ManyApiResponse<ScanPort[]>;
  private _scanPortsPage: number = 0;
  public scanPortFormGroup: FormGroup = null;
  public scanPortFormErrors: any;
  private _dnsRecordTypes: ManyApiResponse<DnsRecordType[]>;
  private _dnsRecordTypesPage: number = 0;
  public dnsRecordTypeFormGroup: FormGroup = null;
  public dnsRecordTypeFormErrors: any;
  public reviewButtonDisabled: boolean = false;
  public scanConfigValidityErrors: string[] = [];

  constructor(
    private orgService: OrganizationService,
    private titleService: WsTitleService,
    private breadcrumbService: WsBreadcrumbsService,
    private router: Router,
    private orderService: WsOrderService,
    private route: ActivatedRoute,
    private notifyService: NotificationsService,
    private scanConfigService: WsScanConfigService,
    private scanPortService: WsScanPortService,
    private dnsRecordTypeService: WsDnsRecordTypeService,
  ) { }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.orgUuid = params['orgId'];
      this.orderUuid = params['orderId'];
    }))
  }

  private fetchAllScanConfig(): void {
    this.fetchScanConfig();
    this.fetchScanPorts();
    this.fetchDnsRecordTypes();
  }

  private fetchDnsRecordTypes(): void {
    this.scanConfigService.getDnsRecordTypesForConfig(this.scanConfigUuid, this.dnsRecordTypesPage)
      .subscribe(dnsRecordTypes => this.dnsRecordTypes = dnsRecordTypes);
  }

  private fetchOrder(): void {
    this.orderService.getOrder(this.orderUuid)
      .subscribe(
        order => {
          if (order.has_been_charged) {
            this.notifyService.error('Error', 'That order has already been placed.');
            this.router.navigate(['/organizations/' + this.orgUuid]);
          } else {
            this.order = order;
          }
        },
        error => {
          if (error.status_code == 404) {
            if (this.organization) {
              this.router.navigate(['/organizations/' + this.orgUuid]);
            } else {
              this.router.navigate(['/organizations/mine']);
            }
          }
        }
      )
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

  private fetchScanConfig(): void {
    this.scanConfigService.getScanConfig(this.scanConfigUuid)
      .subscribe(scanConfig => {
        this.scanConfig = scanConfig;
      });
  }

  private fetchScanPorts(): void {
    this.scanConfigService.getScanPortsForConfig(this.scanConfigUuid, this.scanPortsPage)
      .subscribe(scanPorts => this.scanPorts = scanPorts);
  }

  public onAddDnsRecordTypeClicked(): void {
    this.scanConfigService.createDnsRecordTypeForScanConfig(
      this.scanConfigUuid,
      this.dnsRecordTypeFormGroup.value.record_type,
    ).subscribe(
      _ => {
        this.dnsRecordTypeFormGroup.reset();
        this.fetchDnsRecordTypes();
      },
      error => this.dnsRecordTypeFormErrors = error
    );
  }

  public onAddScanPortClicked(): void {
    this.scanConfigService.createScanPortForScanConfig(
      this.scanConfigUuid,
      this.scanPortFormGroup.value.port_number,
      this.scanPortFormGroup.value.protocol,
    ).subscribe(
      _ => {
        this.scanPortFormGroup.reset();
        this.fetchScanPorts();
      },
      error => this.scanPortFormErrors = error
    );
  }

  public onDeleteDnsRecordTypeClicked(dnsRecordType: DnsRecordType): void {
    this.dnsRecordTypeService.deleteDnsRecordType(dnsRecordType.uuid)
      .subscribe(_ => this.fetchDnsRecordTypes());
  }

  public onDeleteScanPortClicked(scanPort: ScanPort): void {
    this.scanPortService.deleteScanPort(scanPort.uuid)
      .subscribe(_ => this.fetchScanPorts());
  }

  public onDnsRecordTypesPageChanged(pageNumber: number): void {
    this.dnsRecordTypesPage = pageNumber;
  }

  public onReviewClicked(): void {
    this.reviewButtonDisabled = true;
    this.scanConfigValidityErrors = [];
    this.scanConfigService.updateScanConfig(this.scanConfigUuid, this.scanConfigStatus)
      .subscribe(
        _ => {
          this.scanConfigService.getScanConfigValidity(this.scanConfigUuid)
            .subscribe(response => {
              if (response.is_valid) {
                this.router.navigate(['/organizations/' + this.orgUuid + '/check-out/' + this.orderUuid]);
              } else {
                this.scanConfigValidityErrors = response.errors;
                this.reviewButtonDisabled = false;
              }
            });
        },
        error => {
          this.scanConfigFormErrors = error;
          this.reviewButtonDisabled = false;
        }
      );
  }

  public onScanFormChanged(scanConfigStatus: any): void {
    this.scanConfigStatus = scanConfigStatus;
  }

  public onScanPortsPageChanged(pageNumber: number): void {
    this.scanPortsPage = pageNumber;
  }

  get dnsRecordTypes(): ManyApiResponse<DnsRecordType[]> {
    return this._dnsRecordTypes;
  }

  set dnsRecordTypes(newValue: ManyApiResponse<DnsRecordType[]>) {
    this._dnsRecordTypes = newValue;
  }

  get dnsRecordTypesPage(): number {
    return this._dnsRecordTypesPage;
  }

  set dnsRecordTypesPage(newValue: number) {
    this._dnsRecordTypesPage = newValue;
    this.fetchDnsRecordTypes();
  }

  get order(): Order {
    return this._order;
  }

  set order(order: Order) {
    this._order = order;
    this.scanConfigUuid = order.scan_config;
  }

  get organization(): Organization {
    return this._organization;
  }

  set organization(org: Organization) {
    this._organization = org;
    this.titleService.currentTitle = 'Configure ' + org.name + ' Scan';
    this.breadcrumbService.setBreadcrumbsForScanConfig(org, this.orderUuid);
  }

  get orderUuid(): string {
    return this._orderUuid;
  }

  set orderUuid(newValue: string) {
    this._orderUuid = newValue;
    this.fetchOrder();
  }

  get orgUuid(): string {
    return this._orgUuid;
  }

  set orgUuid(newValue: string) {
    this._orgUuid = newValue;
    this.fetchOrganization();
  }

  get scanConfig(): ScanConfig {
    return this._scanConfig;
  }

  set scanConfig(newValue: ScanConfig) {
    this._scanConfig = newValue;
  }

  get scanConfigUuid(): string {
    return this._scanConfigUuid;
  }

  set scanConfigUuid(newValue: string) {
    this._scanConfigUuid = newValue;
    this.fetchAllScanConfig();
  }

  get scanPorts(): ManyApiResponse<ScanPort[]> {
    return this._scanPorts;
  }

  set scanPorts(newValue: ManyApiResponse<ScanPort[]>) {
    this._scanPorts = newValue;
  }

  get scanPortsPage(): number {
    return this._scanPortsPage;
  }

  set scanPortsPage(newValue: number) {
    this._scanPortsPage = newValue;
    this.fetchScanPorts();
  }

}
