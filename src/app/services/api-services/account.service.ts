import { Injectable } from '@angular/core';
import { WsHttpService } from "./ws-http.service";
import { ApiResponseService } from "./api-response.service";


@Injectable()
export class AccountService {

  changePasswordUrl: string;
  baseAccountUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private apiResponseService: ApiResponseService
  ) {
    this.baseAccountUrl = 'account/';
    this.changePasswordUrl = wsHttp.baseApiUrl + this.baseAccountUrl +'change-password/';
    }

  changePassword(currentPassword: string, newPassword: string) {
    let toSend = {
      current_password: currentPassword,
      new_password: newPassword
    };
    return this.wsHttp.post(this.changePasswordUrl, toSend)
      .map(this.apiResponseService.extractApiResponse)
      .map(resp => this.processChangePasswordSuccess(resp))
      .catch(this.apiResponseService.extractApiError);
  }

  processChangePasswordSuccess(response: Object) {
    return response;
  }

}
