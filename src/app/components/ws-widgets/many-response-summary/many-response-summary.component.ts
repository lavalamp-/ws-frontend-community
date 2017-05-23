import {Component, OnInit, Input} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";

@Component({
  selector: 'ws-many-response-summary',
  templateUrl: './many-response-summary.component.html',
  styleUrls: ['./many-response-summary.component.sass']
})
export class ManyResponseSummaryComponent implements OnInit {

  @Input() apiResponse: ManyApiResponse<any>;

  constructor() { }

  ngOnInit() {
  }

  get count(): number {
    if (this.apiResponse) {
      return this.apiResponse.count;
    } else {
      return 12;
    }
  }

  get firstItemIndex(): number {
    if (this.apiResponse) {
      if (this.apiResponse.count == 0) {
        return 0;
      } else {
        return ((this.apiResponse.current_page - 1) * this.apiResponse.page_size) + 1;
      }
    } else {
      return 1;
    }
  }

  get lastItemIndex(): number {
    if (this.apiResponse) {
      if (this.apiResponse.current_page == this.apiResponse.last_page) {
        return this.apiResponse.count;
      } else {
        return this.firstItemIndex + this.apiResponse.page_size - 1;
      }
    } else {
      return 12;
    }

  }

}
