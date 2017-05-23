import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {QueryOrdering} from "../../../services/api-services/models/requests/query-ordering.class";
import {SelectItem} from "../select/select-item.interface";
import {WsLabelsService} from "../../../services/ui-services/ws-labels.service";
import {SortingHelperService} from "../../../services/data-services/sorting-helper.service";

@Component({
  selector: 'ws-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.sass']
})
export class OrderingComponent implements OnInit, OnChanges {

  private initialized: boolean = false;
  private _queryOrdering: QueryOrdering;
  private orderingItems: SelectItem[] = [];
  private _orderField: string;
  private selectedIndex: number;
  @Input() apiResponse: ManyApiResponse<any>;
  @Input() buttonWidth: number = 110;
  @Input() queryOrdering: QueryOrdering;
  @Output() orderingChanged = new EventEmitter;

  constructor(
    private labelService: WsLabelsService,
    private sortingService: SortingHelperService,
  ) { }

  ngOnChanges() {
    this.setOrderingItems();
  }

  ngOnInit() {
  }

  private onOrderSelected(event: any[]): void {
    this.orderField = event[1];
  }

  private onSortDirectionClicked(): void {
    this.queryOrdering.toggleDirection();
    this.orderingChanged.emit(this.queryOrdering);
  }

  private setOrderingItems(): void {
    if (this.apiResponse && !this.initialized) {
      let items = [];
      for (let field of this.apiResponse.sortable_fields) {
        items.push({
          field: field,
          label: this.labelService.getLabelFromString(field),
        });
        this.orderingItems = this.sortingService.sortSelectItems(items);
      }
      if (this.queryOrdering) {
        for (let i = 0; i < this.orderingItems.length; i++) {
          let item = this.orderingItems[i];
          if (item.field == this.queryOrdering.orderField) {
            this.selectedIndex = i;
          }
          if (!this.selectedIndex) {
            console.log('WARNING - could not find selected ordering!');
          }
        }
      }
      this.initialized = true;
    } else if (!this.apiResponse) {
      this.orderingItems = [];
      this.initialized = false;
    }
  }

  get sortText(): string {
    if (this.queryOrdering) {
      return this.queryOrdering.directionLabel;
    } else {
      return 'Ascending';
    }
  }

  get orderField(): string {
    return this._orderField;
  }

  set orderField(newValue: string) {
    this._orderField = newValue;
    this.queryOrdering = new QueryOrdering(newValue);
    this.orderingChanged.emit(this.queryOrdering);
  }

}
