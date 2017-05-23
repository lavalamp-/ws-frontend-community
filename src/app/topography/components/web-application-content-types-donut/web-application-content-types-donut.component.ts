import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {PieDataset} from "../../../components/ws-charts/models/pie-dataset.class";
import {HttpTransactionAnalytics} from "../../../services/api-services/models/analytics/http-transaction-analytics.interface";
import {WsChartService} from "../../../components/ws-charts/ws-chart.service";

@Component({
  selector: 'ws-web-application-content-types-donut',
  templateUrl: './web-application-content-types-donut.component.html',
  styleUrls: ['./web-application-content-types-donut.component.css']
})
export class WebApplicationContentTypesDonutComponent implements OnInit, OnChanges {

  private pieDataset: PieDataset;
  @Input() httpTransactionAnalytics: HttpTransactionAnalytics;
  @Output() contentTypeClicked = new EventEmitter;

  constructor(
    private chartService: WsChartService,
  ) { }

  ngOnChanges(): void {
    if (this.httpTransactionAnalytics) {
      this.pieDataset = this.chartService.dataPointsToPie(this.httpTransactionAnalytics.content_types);
    } else {
      this.pieDataset = null;
    }
  }

  ngOnInit() {
  }

  private onDataClicked(contentType: string): void {
    console.log('Content type clicked');
    console.log(contentType);
  }

}
