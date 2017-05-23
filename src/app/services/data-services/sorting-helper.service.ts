import { Injectable } from '@angular/core';
import {SelectItem} from "../../components/ws-widgets/select/select-item.interface";

@Injectable()
export class SortingHelperService {

  constructor() { }

  public sortDictionariesByKey(toSort: any[], sortKey: string): any[] {
    return toSort.sort(function(a, b) {
      if (a[sortKey] > b[sortKey]) {
        return 1;
      } else if (a[sortKey] < b[sortKey]) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  public sortSelectItems(toSort: SelectItem[]): SelectItem[] {
    return this.sortDictionariesByKey(toSort, 'label');
  }

}
