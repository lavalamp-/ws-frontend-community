import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {PieDataset} from "../../../components/ws-charts/models/pie-dataset.class";
import {WsChartService} from "../../../components/ws-charts/ws-chart.service";
import {SslSupportAnalytics} from "../../../services/api-services/models/analytics/ssl-support-analytics.class";

@Component({
  selector: 'ws-ssl-support-subject-org-donut',
  templateUrl: './ssl-support-subject-org-donut.component.html',
  styleUrls: ['./ssl-support-subject-org-donut.component.css']
})
export class SslSupportSubjectOrgDonutComponent implements OnInit, OnChanges {

  private pieDataset: PieDataset;
  @Input() sslSupportAnalytics: SslSupportAnalytics;
  @Output() subjectClicked = new EventEmitter;

  constructor(
    private chartService: WsChartService,
  ) { }

  ngOnChanges(): void {
    if (this.sslSupportAnalytics) {
      this.pieDataset = this.chartService.dataPointsToPie(this.sslSupportAnalytics.cert_issuer_organization);
    } else {
      this.pieDataset = null;
    }
  }

  ngOnInit() {
  }

  private onDataClicked(value: any): void {
    console.log('Data clicked');
    console.log(value);
    this.subjectClicked.emit(value);
  }

}
