import { Injectable } from '@angular/core';
import {Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class ApiErrorService {

  constructor() { }

  getFirstError(responseJson: Object) {
    let errors = responseJson['errors'];
    if (errors && errors.length) {
      return errors[0];
    }
  }

  requiresRecaptcha(responseJson: Object) {
    let recaptcha = responseJson['recaptcha'];
    if (recaptcha) {
      return true;
    }
    return false;
  }

  getFieldErrors(responseJson: Object, field: string) {
    let errors = responseJson['errors'];
    let results = [];
    if (errors && errors.length) {
      for (var errorObject in errors) {
        // if (errorObject.error_type == 'field_error') {
        //   if (errorObject.field == field)
        //     results.push(errorObject)
        // }
      }
      return results;
    }
  }


}
