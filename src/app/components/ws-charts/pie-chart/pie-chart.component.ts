import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {PieDataset} from "../models/pie-dataset.class";
import {Logger} from "angular2-logger/core";

@Component({
  selector: 'ws-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() pieDataset: PieDataset = null;

  private chartType: string = 'pie';
  private chartData: number[] = [];
  private chartLabels: string[] = [];

  private isReady(): boolean {
    return !!this.pieDataset;
  }

  constructor(
    private logger: Logger
  ) { }

  ngOnChanges() {
    if (this.pieDataset) {
      this.chartData = this.pieDataset.chartData;
      this.chartLabels = this.pieDataset.chartLabels;
    }
  }

  ngOnInit() {
  }

}
