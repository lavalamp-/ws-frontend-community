import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";
import {WebService} from "../../../services/api-services/models/web-service.interface";
import {SslSupport} from "../../../services/api-services/models/ssl-support.class";
import {HtmlWebResource} from "../../../services/api-services/models/html-web-resources.class";
import {GenericWebResource} from "../../../services/api-services/models/generic-web-resource.class";

@Component({
  selector: 'ws-any-summary-row',
  templateUrl: './any-summary-row.component.html',
  styleUrls: ['./any-summary-row.component.sass']
})
export class AnySummaryRowComponent implements OnInit {

  @Input() rowObject: any;
  @Output() filterCreated = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onFilterCreated(queryFilter: QueryFilter): void {
    this.filterCreated.emit(queryFilter);
  }

  get isGenericWebResource(): boolean {
    return this.rowObject instanceof GenericWebResource && !this.isHtmlWebResource;
  }

  get isHtmlWebResource(): boolean {
    return this.rowObject instanceof HtmlWebResource;
  }

  get isSslSupport(): boolean {
    return this.rowObject instanceof SslSupport;
  }

  get isWebService(): boolean {
    return this.rowObject instanceof WebService;
  }

}
