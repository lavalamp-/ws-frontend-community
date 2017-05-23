export class DataTableColumn {

  private _name: string;
  private _prop: string;
  private _flexGrow: number;

  constructor(name: string, property: string) {
    this._name = name;
    this._prop = property;
    this._flexGrow = 1;
  }

  public toDataTableColumn(): any {
    return {
      name: this._name,
      prop: this._prop,
      flexGrow: this._flexGrow
    };
  }

  get flexGrow(): number {
    return this._flexGrow;
  }

  get name(): string {
    return this._name;
  }

  get prop(): string {
    return this._prop;
  }

}
