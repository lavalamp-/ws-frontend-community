import { Injectable } from '@angular/core';
import {WebService} from "./models/web-service.interface";
import {Logger} from "angular2-logger/core";
import {HtmlWebResource} from "./models/html-web-resources.class";
import {GenericWebResource} from "./models/generic-web-resource.class";

@Injectable()
export class WsConversionService {

  constructor(
    private logger: Logger
  ) { }

  public getResponseObjects(toProcess: any[]): any[] {
    let toReturn = [];
    for (let current of toProcess) {
      switch(current['type']) {
        case 'web-service-report':
          toReturn.push(WebService.fromObject(current));
          break;
        case 'generic-web-resource':
          toReturn.push(GenericWebResource.fromObject(current));
          break;
        case 'html-web-resource':
          toReturn.push(HtmlWebResource.fromObject(current));
          break;
        default:
          this.logger.warn('Unsure how to convert type of ' + current['type'] + ' to object.');
          break;
      }
    }
    return toReturn;
  }

}
