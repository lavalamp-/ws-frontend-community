import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {PieDataset} from "../../../components/ws-charts/models/pie-dataset.class";
import {WsChartService} from "../../../components/ws-charts/ws-chart.service";
import {WebServiceAnalytics} from "../../../services/api-services/models/analytics/web-service-analytics.class";

@Component({
  selector: 'ws-web-service-ssl-support-donut',
  templateUrl: './web-service-ssl-support-donut.component.html',
  styleUrls: ['./web-service-ssl-support-donut.component.css']
})
export class WebServiceSslSupportDonutComponent implements OnInit, OnChanges {

  private pieDataset: PieDataset;
  @Input() webServiceAnalytics: WebServiceAnalytics;
  @Output() sslSupportClicked = new EventEmitter;

  constructor(
    private chartService: WsChartService
  ) { }

  ngOnChanges(): void {
    if (this.webServiceAnalytics) {
      this.pieDataset = this.chartService.dataPointsToPie(this.webServiceAnalytics.web_service_uses_ssl);
    } else {
      this.pieDataset = null;
    }
  }

  ngOnInit() {
  }

  private onDataClicked(enabled: number): void {
    if (enabled == 1) {
      this.sslSupportClicked.emit(true);
    } else if (enabled == 0) {
      this.sslSupportClicked.emit(false);
    } else {
      throw 'Unsure how to handle enabled state of ' + enabled.toString() + '.';
    }
  }

}
