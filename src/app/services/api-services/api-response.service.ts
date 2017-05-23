import { Injectable } from '@angular/core';
import {Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class ApiResponseService {

  constructor() { }

  extractApiResponse(response: Response) {
    return response.json();
  }

  extractApiError(response: Response): Observable<any> {
    console.log(response);
    let resp = response.json();
    console.log(resp);
    return Observable.throw(resp);
  }

}
