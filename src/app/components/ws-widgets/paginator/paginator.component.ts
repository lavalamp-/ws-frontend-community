import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";

@Component({
  selector: 'ws-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit {

  @Input() tabCount: number = 5;
  @Input() apiResponse: ManyApiResponse<any>;
  @Output() pageChanged = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onPageClick(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.lastPage && pageNumber != this.currentPage) {
      this.pageChanged.emit(pageNumber);
    }
  }

  get currentPage(): number {
    if (this.apiResponse) {
      return this.apiResponse.current_page;
    } else {
      return 1;
    }
  }

  get lastPage(): number {
    if (this.apiResponse) {
      return this.apiResponse.last_page;
    } else {
      return 1;
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
