import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {DataTableConfiguration} from "../../../components/ws-tables/models/data-table-configuration.class";
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {DomainName} from "../../../services/api-services/models/domain-name.class";
import {WsTableService} from "../../../components/ws-tables/ws-table.service";

@Component({
  selector: 'ws-organization-domain-names',
  templateUrl: './organization-domain-names.component.html',
  styleUrls: ['./organization-domain-names.component.sass']
})
export class OrganizationDomainNamesComponent implements OnInit, OnChanges {

  private _currentPage: number = 1;
  private domainNamesTableConfiguration: DataTableConfiguration;
  @Input() domainsApiResponse: ManyApiResponse<DomainName[]> = null;
  @Output() deleteClicked = new EventEmitter;
  @Output() includeToggled = new EventEmitter;
  @Output() pageChanged = new EventEmitter;

  constructor(
    private tableService: WsTableService
  ) { }

  ngOnChanges(): void {
    if (this.domainsApiResponse) {
      this.domainNamesTableConfiguration = this.tableService.buildDomainsTableFromArray(this.domainsApiResponse.results);
    } else {
      this.domainNamesTableConfiguration = null;
    }
  }

  ngOnInit() {
  }

  private onDeleteClicked(domainUuid: string): void {
    this.deleteClicked.emit(domainUuid);
  }

  private onIncludeToggled(domainUuid: string, state: any): void {
    this.includeToggled.emit({uuid: domainUuid, state: state.checked});
  }

  private onPageClicked(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(newValue: number) {
    this._currentPage = newValue;
    this.pageChanged.emit(this._currentPage);
  }

  get showPagination(): boolean {
    if (!this.domainsApiResponse) {
      return false;
    } else if (this.domainsApiResponse.last_page == 1) {
      return false;
    } else {
      return true;
    }
  }

}
