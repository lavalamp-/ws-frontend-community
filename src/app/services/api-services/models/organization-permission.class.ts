import {BaseModel} from "./model-base.class";

export class OrganizationPermission extends BaseModel {

  public user_uuid: string;
  public user_name: string;
  public can_read: boolean;
  public can_write: boolean;
  public can_scan: boolean;
  public can_admin: boolean;

  public static fromObject(toParse: any): any {
    return new OrganizationPermission(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(OrganizationPermission.fromObject(curParse));
    }
    return toReturn;
  }

}
