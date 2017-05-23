import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {PieDataset} from "../models/pie-dataset.class";
import {DataPoint} from "../../../services/api-services/models/analytics/data-point.interface";
import {WsChartService} from "../ws-chart.service";

@Component({
  selector: 'ws-donut-chart-card',
  templateUrl: './donut-chart-card.component.html',
  styleUrls: ['./donut-chart-card.component.css']
})
export class DonutChartCardComponent implements OnInit, OnChanges {

  private pieDataset: PieDataset;
  @Input() title: string;
  @Input() dataPoints: DataPoint[];
  @Output() dataClicked = new EventEmitter;

  constructor(
    private chartService: WsChartService,
  ) { }

  ngOnChanges(): void {
    if (this.dataPoints) {
      this.pieDataset = this.chartService.dataPointsToPie(this.dataPoints);
    } else {
      this.pieDataset = null;
    }
  }

  ngOnInit() {
  }

  private onDataClicked(value: any): void {
    this.dataClicked.emit(value);
  }

}
