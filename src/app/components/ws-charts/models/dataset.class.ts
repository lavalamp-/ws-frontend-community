import {DataLabel} from "./datalabel.class";
export class Dataset {

  private _data: number[];
  private _label: string;
  private _dataLabel: DataLabel;

  constructor(label: string) {
    this._label = label;
    this._data = [];
    this._dataLabel = new DataLabel();
  }

  public appendData(data: any): void {
    this._data.push(data);
  }

  public appendDataLabel(label: string) {
    this._dataLabel.appendLabel(label);
  }

  public extendData(data: any[]): void {
    for (let dataPoint of data) {
      this._data.push(dataPoint);
    }
  }

  get chartData(): any {
    return {
      data: this.data,
      label: this.label
    }
  }

  get chartLabels(): string[] {
    return this._dataLabel.labels;
  }

  get data(): number[] {
    return this._data;
  }

  get dataLabel(): DataLabel {
    return this._dataLabel;
  }

  get label(): string {
    return this._label;
  }

}
