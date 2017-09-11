interface Flag {
  flag_name: string,
  flag_tag: string,
  flag_weight: number,
}

export class BaseModel {

  public uuid: string;
  public created: string;
  public flags: Flag[];

  constructor(parseObject: any) {
    for (let key of Object.keys(parseObject)) {
      this[key] = parseObject[key];
    }
  }

  public static fromObject(toParse: any): any {
    throw 'Subclasses must implement this!';
  }

  public static fromObjects(toParse: any[]): any[] {
    throw 'Subclasses must implement this!';
  }

  get createdDate(): Date {
    if (this.created) {
      return new Date(this.created);
    } else {
      return null;
    }
  }

  get createdDescription(): string {
    if (this.createdDate) {
      return 'Added on ' + this.createdDate.toDateString();
    } else {
      return 'Add date unknown';
    }
  }

}
