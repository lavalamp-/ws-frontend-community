import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {PieDataset} from "../../../components/ws-charts/models/pie-dataset.class";
import {WsChartService} from "../../../components/ws-charts/ws-chart.service";
import {WebServiceAnalytics} from "../../../services/api-services/models/analytics/web-service-analytics.class";

@Component({
  selector: 'ws-web-service-networks-donut',
  templateUrl: './web-service-networks-donut.component.html',
  styleUrls: ['./web-service-networks-donut.component.css']
})
export class WebServiceNetworksDonutComponent implements OnInit, OnChanges {

  private pieDataSet: PieDataset;
  @Input() webServiceAnalytics: WebServiceAnalytics;
  @Output() networkClicked = new EventEmitter;

  constructor(
    private chartService: WsChartService
  ) { }

  ngOnChanges(): void {
    if (this.webServiceAnalytics) {
      this.pieDataSet = this.chartService.dataPointsToPie(this.webServiceAnalytics.network_cidr_range);
    } else {
      this.pieDataSet = null;
    }
  }

  ngOnInit() {
  }

  private onNetworkClicked(network: string): void {
    this.networkClicked.emit(network);
  }

}
