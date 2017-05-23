import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {Organization} from "../../../services/api-services/models/organization.class";
import {DetailItem} from "../../../components/ws-widgets/models/detail-item.interface";
import {Router} from "@angular/router";
import {WsViewstateService} from "../../../services/ui-services/ws-viewstate.service";
import {DetailListService} from "../../../components/ws-widgets/detail-list.service";

@Component({
  selector: 'ws-organization-summary-row',
  templateUrl: './organization-summary-row.component.html',
  styleUrls: ['./organization-summary-row.component.sass']
})
export class OrganizationSummaryRowComponent implements OnInit, OnChanges {

  @Input() organization: Organization;
  @Input() titlePrelude: string;
  @Output() deleteClicked = new EventEmitter;
  private endpointDetails: DetailItem[];
  private scanDetails: DetailItem[];

  constructor(
    private router: Router,
    private viewstateService: WsViewstateService,
    private detailListService: DetailListService,
  ) { }

  ngOnChanges() {
    if (this.organization) {
      this.endpointDetails = this.detailListService.getOrganizationEndpointDetails(this.organization);
      this.scanDetails = this.detailListService.getOrganizationScanDetails(this.organization);
    } else {
      this.endpointDetails = [];
      this.scanDetails = [];
    }
  }

  ngOnInit() {
  }

  private onConfigureOrganizationClicked(): void {
    this.router.navigate(['/organizations/' + this.organization.uuid]);
  }

  private onDeleteOrganizationClicked(): void {
    this.deleteClicked.emit(null);
  }

  private onViewOrganizationClicked(): void {
    this.viewstateService.selectedOrganization = this.organization;
    this.router.navigate(['/topography/' + this.organization.uuid]);
  }

  get titleText(): string {
    if (this.titlePrelude) {
      return this.titlePrelude + ' ' + this.organization.name;
    } else {
      return this.organization.name;
    }
  }

}
