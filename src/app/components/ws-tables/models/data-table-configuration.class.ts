import { DataTableColumn } from "./data-table-column";
import { DataTableRow } from "./data-table-row";


export class DataTableConfiguration {

  private _columns: DataTableColumn[];
  private _columnMode: string;
  private _existingColumns: string[];
  private _limit: number;
  private _rows: DataTableRow[];

  constructor() {
    this._columns = [];
    this._rows = [];
    this._existingColumns = [];
    this._columnMode = 'flex';
    this._limit = 24;
  }

  public addAsRow(rowContent: any): void {
    let newRow = new DataTableRow(rowContent);
    this._rows.push(newRow);
    for (let key of Object.keys(rowContent)) {
      if (this._existingColumns.indexOf(key) === -1) {
        let newColumn = new DataTableColumn(this.snakeCaseToSpacedTitleCase(key), key);
        this._columns.push(newColumn);
        this._existingColumns.push(key);
      }
    }
  }

  public addAsRows(rowContents: any[]): void {
    for (let rowContent of rowContents) {
      this.addAsRow(rowContent);
    }
  }

  public setColumns(columns: string[]): void {
    let newColumns = [];
    let newColumnNames = [];
    for (let column of columns) {
      let newColumn = new DataTableColumn(this.snakeCaseToSpacedTitleCase(column), column);
      newColumns.push(newColumn);
      newColumnNames.push(column);
    }
    this._columns = newColumns;
    this._existingColumns = newColumnNames;
  }

  private snakeCaseToSpacedTitleCase(snakeCase: string): string {
    let snakeSplit = snakeCase.split("_");
    let titleCases = [];
    for (let toTitle of snakeSplit) {
      let titleCase = toTitle.charAt(0).toUpperCase() + toTitle.slice(1);
      titleCases.push(titleCase);
    }
    return titleCases.map(x => x).join(" ");
  }

  get columnMode(): string {
    return this._columnMode;
  }

  get columns(): DataTableColumn[] {
    return this._columns;
  }

  get dataTableColumnMode(): string {
    return this.columnMode;
  }

  get dataTableColumns(): any[] {
    let toReturn = [];
    for (let column of this._columns) {
      toReturn.push(column.toDataTableColumn());
    }
    return toReturn;
  }

  get dataTableLimit(): number {
    return this._limit;
  }

  get dataTableRows(): any[] {
    let toReturn = [];
    for (let row of this._rows) {
      toReturn.push(row.toDataTableRow());
    }
    return toReturn;
  }

  get rows(): DataTableRow[] {
    return this._rows;
  }

}
