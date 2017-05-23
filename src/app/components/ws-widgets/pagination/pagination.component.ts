import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {Logger} from "angular2-logger/core";
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";

@Component({
  selector: 'ws-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() currentPage: number = 1;
  @Input() lastPage: number = 5;
  @Input() tabCount: number = 5;
  @Input() count: number = 1;
  @Input() includeSummary: boolean = true;
  @Input() pageSize: number = 24;
  @Input() apiResponse: ManyApiResponse<any> = null;
  @Output() pageChanged = new EventEmitter;

  constructor(
    private logger: Logger
  ) { }

  ngOnChanges() {
    if (this.apiResponse) {
      this.currentPage = this.apiResponse.current_page;
      this.lastPage = this.apiResponse.last_page;
      this.count = this.apiResponse.count;
      this.pageSize = this.apiResponse.page_size;
    }
  }

  ngOnInit() {
  }

  onPageClick(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.lastPage && pageNumber != this.currentPage) {
      this.logger.debug('Page ' + pageNumber + ' clicked.');
      this.pageChanged.emit(pageNumber);
    }
  }

  get firstItemIndex(): number {
    return ((this.currentPage - 1) * this.pageSize) + 1;
  }

  get lastItemIndex(): number {
    if (this.currentPage == this.lastPage) {
      return this.count;
    } else {
      return this.firstItemIndex + this.pageSize - 1;
    }
  }

  get pageNumbers(): number[] {
    let toReturn = [];
    let pageNumber = this.startingPage;
    for (let i = 0; i < this.tabCount; i++) {
      toReturn.push(pageNumber);
      pageNumber++;
    }
    return toReturn;
  }

  get startingPage(): number {
    if (this.tabCount % 2) {
      return this.currentPage - ((this.tabCount - 1) / 2);
    } else {
      return this.currentPage - (this.tabCount / 2);
    }
  }

}
