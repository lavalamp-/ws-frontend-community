import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Dataset} from "../models/dataset.class";
import {Logger} from "angular2-logger/core";

@Component({
  selector: 'ws-h-bar-chart',
  templateUrl: './h-bar-chart.component.html',
  styleUrls: ['./h-bar-chart.component.css']
})
export class HBarChartComponent implements OnInit, OnChanges {

  @Input() chartDataset: Dataset = null;

  protected chartDataset2: Dataset;
  protected chartType: string = 'horizontalBar';
  protected chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  protected chartData: any;
  protected chartLabels: string[];

  isReady() {
    return !!this.chartDataset;
  }

  constructor(
    private logger: Logger
  ) { }

  ngOnChanges() {
    if (this.chartDataset) {
      this.chartData = [this.chartDataset.chartData];
      this.chartLabels = this.chartDataset.chartLabels;
    }
  }

  ngOnInit() {
    this.chartData = [{data: [], label: '.: Loading :.'}];
    this.chartLabels = [];
  }

  onClick(event) {
    // this.logger.warn('Click event fired.');
    // console.log(event);
  }

  onHover(event) {
    // this.logger.warn('Hover event fired');
    // console.log(event);
  }

}
