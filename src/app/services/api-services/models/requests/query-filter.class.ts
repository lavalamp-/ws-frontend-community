export class QueryFilter {

  private _filterKey: string;
  private _filterValue: any;
  private _label: string;
  private _included: boolean;

  constructor(filterKey: string, filterValue: any, label: string, included: boolean = true) {
    this._filterKey = filterKey;
    this._filterValue = filterValue;
    this._label = label;
    this._included = included;
  }

  public toggleInclusion(): void {
    this._included = !this._included;
  }

  get filterKey(): string {
    if (this.included) {
      return this._filterKey;
    } else {
      return '-' + this._filterKey;
    }
  }

  get filterValue(): any {
    return this._filterValue;
  }

  get hash(): string {
    return this._filterKey + this.filterValue;
  }

  get included(): boolean {
    return this._included;
  }

  get label(): string {
    return this._label;
  }

}
