import {Injectable, Inject} from '@angular/core';
import {APP_CONFIG} from "../../app.config";

@Injectable()
export class WsStringHelperService {

  constructor(
    @Inject(APP_CONFIG) private config
  ) { }

  public countSpecial(toParse: string): number {
    let toReturn = 0;
    for (let i=0; i<toParse.length; i++) {
      if (this.config.specialChars.indexOf(toParse.charAt(i)) > -1) {
        toReturn++;
      }
    }
    return toReturn;
  }

  public countUpperCase(toParse: string): number {
    let toReturn = 0;
    for (let i=0; i<toParse.length; i++) {
      if (/[A-Z]/.test(toParse.charAt(i))) {
        toReturn++;
      }
    }
    return toReturn;
  }

}
