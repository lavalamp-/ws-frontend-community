import {Component, OnInit, Input, OnChanges, Output, EventEmitter, ElementRef} from '@angular/core';
import {PieDataset} from "../models/pie-dataset.class";

@Component({
  selector: 'ws-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.sass']
})
export class DonutChartComponent implements OnInit, OnChanges {

  @Input() pieDataset: PieDataset;
  @Output() dataClicked = new EventEmitter;

  private chartType: string = 'doughnut';
  private chartColors: any[] = [];
  private chartData: number[] = [];
  private chartLabels: string[] = [];
  private hoverStyle: any = {};

  constructor(
    private elRef: ElementRef,
  ) { }

  ngOnChanges() {
    if (this.pieDataset) {
      this.chartData = this.pieDataset.chartData;
      this.chartLabels = this.pieDataset.chartLabels;
      this.chartColors = this.pieDataset.chartColors;
    }
  }

  ngOnInit() {
  }

  private onChartClicked(event: any): void {
    if (event.active.length == 0) {
      return;
    } else {
      this.dataClicked.emit(this.chartLabels[event.active[0]._index]);
    }
  }

  get chartWidth(): number {
    return this.elRef.nativeElement.firstChild.clientWidth;
  }

  get hasData(): boolean {
    return this.chartData.length > 0;
  }

  get isReady(): boolean {
    return !!this.pieDataset;
  }

}
