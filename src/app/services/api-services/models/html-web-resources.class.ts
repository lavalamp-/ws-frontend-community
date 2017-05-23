import {GenericWebResource} from "./generic-web-resource.class";

export class HtmlWebResource extends GenericWebResource {

  public title: string;
  public tag_decomposition: string;
  public total_tag_count: number;
  public html_tags: any[];
  public internal_url_reference_count: number;
  public external_url_reference_count: number;
  public forms: any[];
  public meta_refresh_location: string;
  public has_login_form: boolean;
  public has_local_login_form: boolean;

  public static fromObject(toParse: any): any {
    return new HtmlWebResource(toParse);
  }

  public static fromObjects(toParse: any[]): any[] {
    let toReturn = [];
    for (let curParse of toParse) {
      toReturn.push(HtmlWebResource.fromObject(curParse));
    }
    return toReturn;
  }

}
