import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {HttpScreenshot} from "../../../services/api-services/models/es/http-screenshot.interface";

@Component({
  selector: 'ws-screenshot-list',
  templateUrl: './screenshot-list.component.html',
  styleUrls: ['./screenshot-list.component.css']
})
export class ScreenshotListComponent implements OnInit {

  @Input() screenshotsApiResponse: ManyApiResponse<HttpScreenshot[]>;
  @Input() showButtons: boolean = true;
  @Output() screenshotPageChanged = new EventEmitter;
  @Output() viewClicked = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onScreenshotPageChanged(pageNumber: number): void {
    this.screenshotPageChanged.emit(pageNumber);
  }

  private onViewClicked(uuid: string): void {
    this.viewClicked.emit(uuid);
  }

  get showScreenshotPagination(): boolean {
    if (!this.screenshotsApiResponse) {
      return false;
    } else if (this.screenshotsApiResponse.last_page == 1) {
      return false;
    } else {
      return true;
    }
  }

}
