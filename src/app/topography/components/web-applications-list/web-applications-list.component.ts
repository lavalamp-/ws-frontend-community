import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {DataTableConfiguration} from "../../../components/ws-tables/models/data-table-configuration.class";
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {WebService} from "../../../services/api-services/models/web-service.interface";
import {WsTableService} from "../../../components/ws-tables/ws-table.service";

@Component({
  selector: 'ws-web-applications-list',
  templateUrl: './web-applications-list.component.html',
  styleUrls: ['./web-applications-list.component.sass']
})
export class WebApplicationsListComponent implements OnInit, OnChanges {

  private _currentPage: number = 1;
  private webApplicationsTableConfiguration: DataTableConfiguration;
  @Input() webAppsApiResponse: ManyApiResponse<WebService[]>;
  @Output() viewClicked = new EventEmitter;
  @Output() pageChanged = new EventEmitter;

  constructor(
    private tableService: WsTableService,
  ) { }

  ngOnChanges(): void {
    if (this.webAppsApiResponse) {
      this.webApplicationsTableConfiguration = this.tableService.buildWebAppsTableFromArray(this.webAppsApiResponse.results);
    } else {
      this.webApplicationsTableConfiguration = null;
    }
  }

  ngOnInit() {
  }

  private onPageClicked(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  private onViewClicked(uuid: string): void {
    console.log('View clicked');
    console.log(uuid);
    this.viewClicked.emit(uuid);
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(newValue: number) {
    this._currentPage = newValue;
    console.log('new current page');
    console.log(this._currentPage);
    this.pageChanged.emit(this._currentPage);
  }

  get showPagination(): boolean {
    if (!this.webAppsApiResponse) {
      return false;
    } else if (this.webAppsApiResponse.last_page == 1) {
      return false;
    } else {
      return true;
    }
  }

}
