export class DataTableRow {

  private _content: any;

  constructor(content: any) {
    this._content = content;
  }

  public toDataTableRow(): any {
    return this._content;
  }

  get content(): any {
    return this._content;
  }

}
