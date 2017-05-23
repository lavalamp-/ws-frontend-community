import {DataPoint} from "../../../services/api-services/models/analytics/data-point.interface";

export class PieDataset {

  private _labels: string[] = [];
  private _values: number[] = [];
  private _colors: any[] = [];

  constructor(
  ) { }

  public addDataPoint(toAdd: DataPoint): void {
    this._labels.push(toAdd.label);
    this._values.push(toAdd.count);
  }

  public setChartColors(colors: any[]): void {
    this._colors = colors;
  }

  get chartColors(): any[] {
    return this._colors;
  }

  get chartData(): number[] {
    return this._values;
  }

  get chartLabels(): string[] {
    return this._labels;
  }

  get chartType(): string {
    return 'pie';
  }

  get labels(): string[] {
    return this._labels;
  }

  get values(): number[] {
    return this._values;
  }

}
