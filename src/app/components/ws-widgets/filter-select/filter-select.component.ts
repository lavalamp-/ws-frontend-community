import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {WsLabelsService} from "../../../services/ui-services/ws-labels.service";
import {SelectItem} from "../select/select-item.interface";
import {SortingHelperService} from "../../../services/data-services/sorting-helper.service";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";

@Component({
  selector: 'ws-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.sass']
})
export class FilterSelectComponent implements OnInit, OnChanges {

  private filterText: string;
  private fieldSelectItems: SelectItem[] = [];
  private valueSelectItems: SelectItem[] = [];
  private _selectedField: string;
  private selectedLabel: string;
  private selectedValue: string;
  @Input() placeholder: string = 'Add Filter...';
  @Input() apiResponse: ManyApiResponse<any>;
  @Output() filterCreated = new EventEmitter;

  constructor(
    private labelService: WsLabelsService,
    private sortingService: SortingHelperService,
  ) { }

  ngOnChanges() {
    this.setFilterFields();
  }

  ngOnInit() {
  }

  private createFilter(): QueryFilter {
    let filterValue;
    if (this.selectedValue) {
      filterValue = this.selectedValue;
    } else {
      filterValue = this.filterText;
    }
    return new QueryFilter(
      this.selectedField,
      filterValue,
      this.selectedLabel + ' Equals ' + filterValue,
      true
    );
  }

  private onAddFilterClicked(): void {
    let filter = this.createFilter();
    this.filterCreated.emit(filter);
    this.reset();
  }

  private onFilterFieldSelected(selection: any[]): void {
    this.selectedField = selection[1];
    this.selectedLabel = selection[2];
    this.filterText = null;
    this.selectedValue = null;
  }

  private onFilterValueSelected(selection: any[]): void {
    this.selectedValue = selection[1];
    console.log(selection);
  }

  private reset(): void {
    this.selectedField = null;
    this.selectedValue = null;
    this.filterText = null;
    this.setFilterFields();
  }

  private setFilterFields(): void {
    if (this.apiResponse && this.apiResponse.filter_fields) {
      let items = [];
      for (let field of this.apiResponse.filter_fields) {
        items.push({
          field: field,
          label: this.labelService.getLabelFromString(field),
        });
      }
      this.fieldSelectItems = this.sortingService.sortSelectItems(items);
    } else {
      this.fieldSelectItems = [];
    }
  }

  private setValueSelectItems(): void {
    if (this.selectedField && this.apiResponse.hasOwnProperty(this.selectedField)) {
      let items = [];
      for (let dataPoint of this.apiResponse[this.selectedField]) {
        items.push({
          field: dataPoint.label,
          label: dataPoint.label + ' (' + dataPoint.count + ')'
        });
      }
      this.valueSelectItems = items;
    } else {
      this.valueSelectItems = [];
    }
  }

  get hasValueSelectItems(): boolean {
    return this.valueSelectItems.length > 0;
  }

  get readyForAdd(): boolean {
    if (!this.selectedField) {
      return false;
    } else if (this.hasValueSelectItems && !this.selectedValue) {
      return false;
    } else if (!this.hasValueSelectItems && !this.filterText) {
      return false;
    } else {
      return true;
    }
  }

  get selectedField(): string {
    return this._selectedField;
  }

  set selectedField(newValue: string) {
    this._selectedField = newValue;
    this.setValueSelectItems();
  }

}
