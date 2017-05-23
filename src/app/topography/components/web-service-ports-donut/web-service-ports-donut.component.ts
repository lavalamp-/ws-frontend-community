import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {WebTechReport} from "../../../services/api-services/models/es/web-tech-report.interface";
import {PieDataset} from "../../../components/ws-charts/models/pie-dataset.class";
import {WsChartService} from "../../../components/ws-charts/ws-chart.service";
import {WebServiceAnalytics} from "../../../services/api-services/models/analytics/web-service-analytics.class";

@Component({
  selector: 'ws-web-service-ports-donut',
  templateUrl: './web-service-ports-donut.component.html',
  styleUrls: ['./web-service-ports-donut.component.css']
})
export class WebServicePortsDonutComponent implements OnInit, OnChanges {

  private pieDataSet: PieDataset;
  @Input() webServiceAnalytics: WebServiceAnalytics;
  @Output() portClicked = new EventEmitter;

  constructor(
    private chartService: WsChartService,
  ) { }

  ngOnChanges(): void {
    if (this.webServiceAnalytics) {
      this.pieDataSet = this.chartService.dataPointsToPie(this.webServiceAnalytics.network_service_port);
    } else {
      this.pieDataSet = null;
    }
  }

  ngOnInit() {
  }

  private onDataClicked(portNumber: number): void {
    this.portClicked.emit(portNumber);
  }

}
