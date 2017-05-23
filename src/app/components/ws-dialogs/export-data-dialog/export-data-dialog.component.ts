import {Component, OnInit, Inject, OnChanges} from '@angular/core';
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";
import {QueryOrdering} from "../../../services/api-services/models/requests/query-ordering.class";
import {MdDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {APP_CONFIG} from "../../../app.config";
import {WsExportService} from "../../../services/api-services/ws-export.service";
import {WsLabelsService} from "../../../services/ui-services/ws-labels.service";

@Component({
  selector: 'ws-export-data-dialog',
  templateUrl: './export-data-dialog.component.html',
  styleUrls: ['./export-data-dialog.component.sass']
})
export class ExportDataDialogComponent implements OnInit {

  public filtersIncluded: boolean = true;
  private _exportType: string = 'csv';
  public nameForm: FormGroup;
  public exportUrl: string;
  public queryFilters: QueryFilter[];
  public queryOrdering: QueryOrdering;
  public searchTerm: string;
  public fields: string[];
  public displayFields: any[];

  constructor(
    public dialogRef: MdDialogRef<ExportDataDialogComponent>,
    private formBuilder: FormBuilder,
    private exportService: WsExportService,
    private labelService: WsLabelsService,
    @Inject(APP_CONFIG) private config,
  ) { }

  ngOnInit() {
    this.nameForm = this.formBuilder.group({
      'fileName': ['', Validators.required],
      'searchTerm': [this.searchTerm],
    });
    this.initializeFields();
  }

  private initializeFields(): void {
    let displayFields = [];
    for (let field of this.fields) {
      displayFields.push({
        label: this.labelService.getLabelFromString(field),
        field: field,
        enabled: true,
      });
    }
    this.displayFields = displayFields;
  }

  public onExcludeAllClicked(): void {
    for (let displayField of this.displayFields) {
      displayField.enabled = false;
    }
  }

  public onExportClicked(): void {
    let queryFilters = [];
    let searchTerm = null;
    if (this.filtersIncluded) {
      queryFilters = this.queryFilters;
      if (!this.nameForm.value.searchTerm || this.nameForm.value.searchTerm == '') {
        searchTerm = null;
      } else {
        searchTerm = this.nameForm.value.searchTerm;
      }
    }
    this.exportService.exportData(
      this.exportUrl,
      this._exportType,
      this.nameForm.value.fileName,
      queryFilters,
      this.queryOrdering,
      searchTerm,
      this.selectedFields,
    )
      .subscribe(_ => this.dialogRef.close());
  }

  public onFieldToggled(index: number): void {
    this.displayFields[index].enabled = !this.displayFields[index].enabled;
  }

  public onFileTypeChange(event: any): void {
    this._exportType = event.value;
  }

  public onFilterChanged(index: number, queryFilter: QueryFilter): void {
    this.queryFilters[index] = queryFilter;
  }

  public onFilterRemoved(index: number): void {
    this.queryFilters.splice(index, 1);
  }

  public onFiltersIncludedChange(event: any): void {
    this.filtersIncluded = event.checked;
  }

  public onIncludeAllClicked(): void {
    for (let displayField of this.displayFields) {
      displayField.enabled = true;
    }
  }

  get readyForExport(): boolean {
    return this.nameForm.valid && this.selectedFields.length > 0;
  }

  get selectedFields(): string[] {
    let toReturn = [];
    for (let displayField of this.displayFields) {
      if (displayField.enabled) {
        toReturn.push(displayField.field);
      }
    }
    return toReturn;
  }

}
