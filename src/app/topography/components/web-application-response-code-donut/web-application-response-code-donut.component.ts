import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import {PieDataset} from "../../../components/ws-charts/models/pie-dataset.class";
import {HttpTransactionAnalytics} from "../../../services/api-services/models/analytics/http-transaction-analytics.interface";
import {WsChartService} from "../../../components/ws-charts/ws-chart.service";

@Component({
  selector: 'ws-web-application-response-code-donut',
  templateUrl: './web-application-response-code-donut.component.html',
  styleUrls: ['./web-application-response-code-donut.component.css']
})
export class WebApplicationResponseCodeDonutComponent implements OnInit, OnChanges {

  private pieDataset: PieDataset;
  @Input() httpTransactionAnalytics: HttpTransactionAnalytics;
  @Output() responseCodeClicked = new EventEmitter;

  constructor(
    private chartService: WsChartService,
  ) { }

  ngOnChanges(): void {
    if (this.httpTransactionAnalytics) {
      this.pieDataset = this.chartService.dataPointsToPie(this.httpTransactionAnalytics.response_statuses);
    } else {
      this.pieDataset = null;
    }
  }

  ngOnInit() {
  }

  private onDataClicked(statusCode: number): void {
    console.log('Status code clicked');
    console.log(statusCode);
  }

}
