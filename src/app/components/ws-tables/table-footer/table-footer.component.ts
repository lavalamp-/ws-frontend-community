import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";

@Component({
  selector: 'ws-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.sass']
})
export class TableFooterComponent implements OnInit {

  @Input() apiResponse: ManyApiResponse<any>;
  @Output() pageChanged = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  get showPagination(): boolean {
    if (this.apiResponse) {
      return this.apiResponse.count > this.apiResponse.page_size;
    } else {
      return false;
    }
  }

  private onPageChanged(page: number): void {
    this.pageChanged.emit(page);
  }

}
