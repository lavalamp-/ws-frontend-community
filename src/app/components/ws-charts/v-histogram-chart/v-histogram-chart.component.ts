import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {HistogramDataset} from "../models/histogram-dataset.class";
import {Logger} from "angular2-logger/core";

@Component({
  selector: 'ws-v-histogram-chart',
  templateUrl: './v-histogram-chart.component.html',
  styleUrls: ['./v-histogram-chart.component.css']
})
export class VHistogramChartComponent implements OnInit, OnChanges {

  @Input() histogramDataset: HistogramDataset = null;

  private chartType: string = 'bar';
  private chartData: any[] = [];
  private chartLabels: string[] = [];
  private chartOptions: any = {
    responsive: true
  };

  private isReady(): boolean {
    return !!this.histogramDataset;
  }

  constructor(
    private logger: Logger
  ) { }

  ngOnChanges() {
    if (this.histogramDataset) {
      this.chartData = this.histogramDataset.chartData;
      this.chartLabels = this.histogramDataset.chartLabels;
    }
  }

  ngOnInit() {
  }

}
