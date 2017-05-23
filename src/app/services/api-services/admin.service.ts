import { Injectable } from '@angular/core';
import { WsHttpService } from "./ws-http.service";
import { ApiResponseService } from "./api-response.service";

@Injectable()
export class AdminService {

  manageUsersUrl: string;
  manageUsersEnableDisableUrl: string;
  manageUsersDeleteUserUrl: string;
  manageUsersResendVerificationEmailUrl: string;
  baseAdminUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private apiResponseService: ApiResponseService
  ) {
    this.baseAdminUrl = 'admin/';
    this.manageUsersUrl = wsHttp.baseApiUrl + this.baseAdminUrl +'manage-users/';
    this.manageUsersEnableDisableUrl = wsHttp.baseApiUrl + this.baseAdminUrl +'manage-users/enable-disable/';
    this.manageUsersDeleteUserUrl = wsHttp.baseApiUrl + this.baseAdminUrl +'manage-users/delete-user/';
    this.manageUsersResendVerificationEmailUrl = wsHttp.baseApiUrl + this.baseAdminUrl +'manage-users/resend-verification-email/';
  }

  getManageUsers() {
    return this.wsHttp.get(this.manageUsersUrl)
      .map(this.apiResponseService.extractApiResponse)
      .map(resp => { return resp })
      .catch(this.apiResponseService.extractApiError);
  }

  postManageUsersEnableDisable(enabled: boolean, userUuid: string) {
    let toSend = {
      user_uuid: userUuid,
      enabled: enabled
    };
    return this.wsHttp.post(this.manageUsersEnableDisableUrl, toSend)
      .map(this.apiResponseService.extractApiResponse)
      .map(resp => { return resp })
      .catch(this.apiResponseService.extractApiError);
  }

  postManageUsersDeleteUser(userUuid: string) {
    let toSend = {
      user_uuid: userUuid
    };
    return this.wsHttp.post(this.manageUsersDeleteUserUrl, toSend)
      .map(this.apiResponseService.extractApiResponse)
      .map(resp => { return resp })
      .catch(this.apiResponseService.extractApiError);
  }

  postManageUsersResendVerificationEmail(userUuid: string) {
    let toSend = {
      user_uuid: userUuid
    };
    return this.wsHttp.post(this.manageUsersResendVerificationEmailUrl, toSend)
      .map(this.apiResponseService.extractApiResponse)
      .map(resp => { return resp })
      .catch(this.apiResponseService.extractApiError);
  }

}
