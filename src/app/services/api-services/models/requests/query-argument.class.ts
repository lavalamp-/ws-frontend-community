export class QueryArgument {

  private _key: string;
  private _value: any;

  constructor(key: string, value: any) {
    this._key = key;
    this._value = value;
  }

  get key(): string {
    return this._key;
  }

  get queryTuple(): string {
    return this.key + '=' + this.value.toString();
  }

  get value(): any {
    return this._value;
  }

}
