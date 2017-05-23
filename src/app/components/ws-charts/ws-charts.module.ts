import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HBarChartComponent } from './h-bar-chart/h-bar-chart.component';
import {ChartsModule} from "ng2-charts";
import { PieChartComponent } from './pie-chart/pie-chart.component';
import {WsChartService} from "./ws-chart.service";
import { VHistogramChartComponent } from './v-histogram-chart/v-histogram-chart.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { DonutChartCardComponent } from './donut-chart-card/donut-chart-card.component';
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    HBarChartComponent,
    PieChartComponent,
    VHistogramChartComponent,
    DonutChartComponent,
    DonutChartCardComponent
  ],
  exports: [
    HBarChartComponent,
    PieChartComponent,
    VHistogramChartComponent,
    DonutChartComponent,
    DonutChartCardComponent,
  ],
  providers: [
    WsChartService,
  ]
})
export class WsChartsModule { }
