import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {Network} from "../../../services/api-services/models/network.class";
import {WsTableService} from "../../../components/ws-tables/ws-table.service";
import {DataTableConfiguration} from "../../../components/ws-tables/models/data-table-configuration.class";

@Component({
  selector: 'ws-organization-networks',
  templateUrl: './organization-networks.component.html',
  styleUrls: ['./organization-networks.component.scss']
})
export class OrganizationNetworksComponent implements OnInit, OnChanges {

  private _currentPage: number = 1;
  private networksTableConfiguration: DataTableConfiguration;
  @Input() networksApiResponse: ManyApiResponse<Network[]> = null;
  @Output() deleteClicked = new EventEmitter;
  @Output() includeToggled = new EventEmitter;
  @Output() pageChanged = new EventEmitter;

  constructor(
    private tableService: WsTableService
  ) { }

  ngOnChanges(): void {
    if (this.networksApiResponse) {
      this.networksTableConfiguration = this.tableService.buildNetworksTableFromArray(this.networksApiResponse.results);
    } else {
      this.networksTableConfiguration = null;
    }
  }

  ngOnInit() {
  }

  private onDeleteClicked(networkUuid: string): void {
    this.deleteClicked.emit(networkUuid);
  }

  private onIncludeToggled(networkUuid: string, state: any): void {
    this.includeToggled.emit({uuid: networkUuid, state: state.checked});
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
    if (!this.networksApiResponse) {
      return false;
    } else if (this.networksApiResponse.last_page == 1) {
      return false;
    } else {
      return true;
    }
  }

}
