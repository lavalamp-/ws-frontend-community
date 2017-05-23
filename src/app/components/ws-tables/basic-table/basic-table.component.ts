import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {DataTableConfiguration} from "../models/data-table-configuration.class";
import {Logger} from "angular2-logger/core";
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {QueryOrdering} from "../../../services/api-services/models/requests/query-ordering.class";

@Component({
  selector: 'ws-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.css']
})
export class BasicTableComponent implements OnInit, OnChanges {

  @Input() tableConfiguration: DataTableConfiguration;
  @Input() enableSelect: boolean;
  @Input() selectionType: string;
  @Input() disableMargins: boolean;
  @Input() apiResponse: ManyApiResponse<any>;
  @Output() rowsSelected = new EventEmitter;
  @Output() pageClicked = new EventEmitter;
  @Output() sortChanged = new EventEmitter;

  private columnMode: string;
  private rows: any[];
  private columns: any[];
  private limit: number;
  private footerHeight: number;

  constructor(
    private logger: Logger
  ) { }

  ngOnChanges() {
    if (this.tableConfiguration) {
      this.rows = this.tableConfiguration.dataTableRows;
      this.columns = this.tableConfiguration.dataTableColumns;
      this.columnMode = this.tableConfiguration.dataTableColumnMode;
      this.limit = this.tableConfiguration.dataTableLimit;
    }
  }

  ngOnInit() {
    this.enableSelect = true;
    this.disableMargins = false;
    this.selectionType = 'single';
    this.footerHeight = 50;
  }

  onActivate(event) {
  }

  onClick(clickedRow: any) {
  }

  onPageClick(pageNumber: number): void {
    this.logger.debug('Page number ' + pageNumber + ' clicked.');
    this.pageClicked.emit(pageNumber);
  }

  onSelect(event) {
    this.rowsSelected.emit(event.selected);
  }

  onSort(event) {
    this.sortChanged.emit(new QueryOrdering(event.column.prop, event.newValue));
  }

  get paginationEnabled(): boolean {
    return (this.rows.length > this.limit);
  }

  get showPagination(): boolean {
    if (!this.apiResponse) {
      return false;
    } else if (this.apiResponse.last_page == 1) {
      return false;
    } else {
      return true;
    }
  }

}
