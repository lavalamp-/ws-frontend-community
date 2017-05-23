import {BaseModel} from "./model-base.class";

export class GenericWebResource extends BaseModel {

  public web_service_uuid: string;
  public org_uuid: string;
  public web_service_scan_uuid: string;
  public url_path: string;
  public request_headers: any[];
  public request_method: string;
  public response_headers: any[];
  public query_arguments: any[];
  public body_arguments: any[];
  public response_status: number;
  public content_type: string;
  public coalesced_content_type: string;
  public content_length: number;
  public content_md5_hash: string;
  public content_sha256_hash: string;
  public header_redirect_location: string;

  public static fromObject(toParse: any): any {
    return new GenericWebResource(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(GenericWebResource.fromObject(curParse));
    }
    return toReturn;
  }

}
