import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {DataTableConfiguration} from "../../../components/ws-tables/models/data-table-configuration.class";
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {HttpTransaction} from "../../../services/api-services/models/es/http-transaction.interface";
import {WsTableService} from "../../../components/ws-tables/ws-table.service";

@Component({
  selector: 'ws-http-transactions-list',
  templateUrl: './http-transactions-list.component.html',
  styleUrls: ['./http-transactions-list.component.sass']
})
export class HttpTransactionsListComponent implements OnInit, OnChanges {

  private _currentPage: number = 1;
  private transactionsTableConfiguration: DataTableConfiguration;
  @Input() transactionsApiResponse: ManyApiResponse<HttpTransaction[]>;
  @Output() pageChanged = new EventEmitter;

  constructor(
    private tableService: WsTableService,
  ) { }

  ngOnChanges(): void {
    if (this.transactionsApiResponse) {
      this.transactionsTableConfiguration = this.tableService.buildTransactionsTableFromArray(this.transactionsApiResponse.results);
    } else {
      this.transactionsTableConfiguration = null
    }
  }

  ngOnInit() {
  }

  private onPageClicked(pageNumber: number): void {
    this.currentPage = pageNumber;
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
    if (!this.transactionsApiResponse) {
      return false;
    } else if (this.transactionsApiResponse.last_page == 1) {
      return false;
    } else {
      return true;
    }
  }

}
