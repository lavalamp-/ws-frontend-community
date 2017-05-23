import {QueryArgument} from "./query-argument.class";
export class QueryOrdering {

  private _orderField: string;
  private _orderDirection: string;

  constructor(orderField: string, orderDirection?: string) {
    if (!orderDirection) {
      orderDirection = 'asc';
    }
    if (orderDirection != 'asc' && orderDirection != 'desc') {
      throw 'Order direction of ' + orderDirection + ' is not valid.';
    }
    this._orderField = orderField;
    this._orderDirection = orderDirection;
  }

  public toggleDirection(): void {
    if (this.orderDirection == 'asc') {
      this.orderDirection = 'desc';
    } else {
      this.orderDirection = 'asc';
    }
  }

  public toQueryArgument(key: string): QueryArgument {
    return new QueryArgument(key, this.orderingString);
  }

  get directionLabel(): string {
    if (this.orderDirection == 'asc') {
      return 'Ascending';
    } else {
      return 'Descending';
    }
  }

  get orderDirection(): string {
    return this._orderDirection;
  }

  set orderDirection(newValue: string) {
    this._orderDirection = newValue;
  }

  get orderField(): string {
    return this._orderField;
  }

  get orderingString(): string {
    if (this.orderDirection == 'asc') {
      return this.orderField;
    } else {
      return '-' + this.orderField;
    }
  }

}
