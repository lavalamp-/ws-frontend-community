import { Injectable } from '@angular/core';
import {Organization} from "../../services/api-services/models/organization.class";
import {Dataset} from "./models/dataset.class";
import {DataPoint} from "../../services/api-services/models/analytics/data-point.interface";
import {PieDataset} from "./models/pie-dataset.class";
import {HistogramDataset} from "./models/histogram-dataset.class";
import {WsColorService} from "../../services/ui-services/ws-color.service";

@Injectable()
export class WsChartService {

  constructor(
    private colorService: WsColorService
  ) { }

  private getPieColorPalette(length: number): any[] {
    let colors = this.colorService.getColorPaletteOfLength(length);
    return [{
      backgroundColor: colors,
      hoverBackgroundColor: colors,
    }];
  }

  public dataPointsToHistogram(dataPoints: DataPoint[], seriesName: string): HistogramDataset {
    let toReturn = new HistogramDataset();
    for (let dataPoint of dataPoints) {
      toReturn.addDataPoint(dataPoint, seriesName);
      toReturn.addDataLabel(dataPoint);
    }
    return toReturn;
  }

  public dataPointsToPie(dataPoints: DataPoint[]): PieDataset {
    let toReturn = new PieDataset();
    for (let dataPoint of dataPoints) {
      toReturn.addDataPoint(dataPoint);
    }
    toReturn.setChartColors(this.getPieColorPalette(dataPoints.length));
    return toReturn;
  }

  public getServiceDistributionFromOrganization(organization: Organization): Dataset[] {
    let datasetMap = {};
    // for (let entry of organization.service_distribution) {
    //   if (!(entry.protocol in datasetMap)) {
    //     datasetMap[entry.protocol] = new Dataset(entry.protocol.toUpperCase() + ' Services');
    //   }
    //   datasetMap[entry.protocol].appendData(entry.count);
    //   datasetMap[entry.protocol].appendDataLabel('Port ' + entry.port);
    // }
    let toReturn = [];
    for (let key in datasetMap) {
      toReturn.push(datasetMap[key]);
    }
    return toReturn;
  }

}
