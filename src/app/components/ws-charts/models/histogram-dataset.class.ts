import {DataPoint} from "../../../services/api-services/models/analytics/data-point.interface";
export class HistogramDataset {

    private _dataMap: any = {};
    private _labels: string[] = [];

    constructor() { }

    public addDataLabel(toAdd: DataPoint): void {
      this._labels.push(toAdd.label);
    }

    public addDataPoint(toAdd: DataPoint, seriesName: string): void {
      if (!(seriesName in this._dataMap)) {
        this._dataMap[seriesName] = {
          data: [],
          label: seriesName
        };
      }
      this._dataMap[seriesName].data.push(toAdd.count);
    }

    get chartData(): any[] {
      let toReturn = [];
      for (let seriesName of Object.keys(this.dataMap)) {
        toReturn.push(this.dataMap[seriesName]);
      }
      return toReturn;
    }

    get chartLabels(): string[] {
      return this._labels;
    }

    get chartType(): string {
      return 'bar';
    }

    get dataMap(): any {
      return this._dataMap;
    }

    get labels(): string[] {
      return this._labels;
    }

}
