import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {Organization} from "../../../services/api-services/models/organization.class";
import {QueryOrdering} from "../../../services/api-services/models/requests/query-ordering.class";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";

@Component({
  selector: 'ws-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.sass']
})
export class OrganizationListComponent implements OnInit {

  @Input() apiResponse: ManyApiResponse<Organization[]>;
  @Input() searchTerm: string;
  @Input() queryOrdering: QueryOrdering;
  @Output() exportClicked = new EventEmitter;
  @Output() pageChanged = new EventEmitter;
  @Output() searchChanged = new EventEmitter;
  @Output() filterCreated = new EventEmitter;
  @Output() orderingChanged = new EventEmitter;
  @Output() deleteOrganizationClicked = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onDeleteOrganizationClicked(organization: Organization): void {
    this.deleteOrganizationClicked.emit(organization);
  }

  private onExportClicked(): void {
    this.exportClicked.emit(null);
  }

  private onFilterCreated(filter: QueryFilter): void {
    this.filterCreated.emit(filter);
  }

  private onOrderingChanged(ordering: QueryOrdering): void {
    this.orderingChanged.emit(ordering);
  }

  private onPageChanged(page: number): void {
    this.pageChanged.emit(page);
  }

  private onSearchChanged(term: string): void {
    this.searchChanged.emit(term);
  }

}
