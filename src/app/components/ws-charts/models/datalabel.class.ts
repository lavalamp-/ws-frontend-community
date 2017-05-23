export class DataLabel {

  private _labels: string[];

  constructor() {
    this._labels = [];
  }

  public appendLabel(label: string): void {
    this._labels.push(label);
  }

  public extentLabel(labels: string[]): void {
    for (let label of labels) {
      this._labels.push(label);
    }
  }

  get labels(): string[] {
    return this._labels;
  }

}
