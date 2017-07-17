import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, BehaviorSubject } from "rxjs";
import { ApiResponseService } from "./api-response.service";
import { WsHttpService } from "./ws-http.service";
import { AuthResponse } from "./models/responses/auth-response.interface";
import {AuthState} from "./models/auth/auth-state.class";

@Injectable()
export class AuthService {

  public authLoaded: boolean = false;
  public authToken: string = null;
  private _isAuthenticated: boolean = false;
  private _isAdmin: boolean = false;
  private _userUuid: string = null;
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userUuid: BehaviorSubject<string> = new BehaviorSubject(null);
  public authStateChange: BehaviorSubject<AuthState> = new BehaviorSubject(this.authState);

  authUrl: string;
  authCheckUrl: string;
  signUpUrl: string;
  setupAccountUrl: string;
  logoutUrl: string;
  redirectUrl: string;
  verifyEmailUrl: string;
  forgotPasswordUrl: string;
  verifyforgotPasswordUrl: string;

  constructor(
    private wsHttp: WsHttpService,
    private apiResponseService: ApiResponseService
  ) {
    this.authUrl = wsHttp.baseApiUrl + 'api-token-auth/';
    this.authCheckUrl = wsHttp.baseApiUrl + 'api-check-token-auth/';
    this.signUpUrl = wsHttp.baseApiUrl + 'users/';
    this.setupAccountUrl = wsHttp.baseApiUrl + 'setup-account/';
    this.logoutUrl = wsHttp.baseApiUrl + 'log-out';
    this.verifyEmailUrl = wsHttp.baseApiUrl + 'verify-email/';
    this.forgotPasswordUrl = wsHttp.baseApiUrl + 'forgot-password/';
    this.verifyforgotPasswordUrl = wsHttp.baseApiUrl + 'verify-forgot-password/';
  }

  public authenticateUser(emailAddress: string, password: string): Observable<AuthResponse> {
    let toSend = {
      username: emailAddress,
      password: password
    };
    return this.wsHttp.post(this.authUrl, toSend)
      .map(response => {
        let toReturn = response.json() as AuthResponse;
        this.processAuthSuccess(toReturn);
        return toReturn;
      });
  }

  public checkAuthStatus(): Observable<boolean> {
    return this.wsHttp.get(this.authCheckUrl)
      .map(this.apiResponseService.extractApiResponse)
      .map(resp => this.processAuthSuccess(resp))
      .catch(this.apiResponseService.extractApiError);
  }

  processAuthSuccess(authResponse: AuthResponse): boolean {
    this.setAuthToken(authResponse.token);
    this._isAuthenticated = authResponse.is_authenticated;
    this.isAuthenticated.next(authResponse.is_authenticated);
    this._isAdmin = authResponse.is_admin;
    this.isAdmin.next(authResponse.is_admin);
    this._userUuid = authResponse.user_uuid;
    this.userUuid.next(authResponse.user_uuid);
    this.broadcastAuthState();
    return this.isAuthenticated.getValue();
  }

  checkAdminStatus(): Observable<boolean> {
    return this.wsHttp.get(this.authCheckUrl)
      .map(this.apiResponseService.extractApiResponse)
      .map(resp => this.processAdminSuccess(resp))
      .catch(this.apiResponseService.extractApiError);
  }

  processAdminSuccess(authResponse: AuthResponse): boolean {
    this.processAuthSuccess(authResponse);
    return this.isAdmin.getValue();
  }

  clearAuthToken() {
    this.authToken = null;
    this.wsHttp.authToken = null;
    localStorage.removeItem('authToken');
  }

  loadAndCheck(): Observable<boolean> {
    this.loadTokenFromStorage();
    if (this.authToken) {
      return this.checkAuthStatus();
    } else {
      return Observable.create(obs => obs.next(false));
    }
  }

  loadAndCheckAdmin(): Observable<boolean> {
    this.loadTokenFromStorage();
    if (this.authToken) {
      return this.checkAdminStatus();
    } else {
      return Observable.create(obs => obs.next(false));
    }
  }

  loadTokenFromStorage() {
    if (localStorage.getItem('authToken')) {
      this.setAuthToken(localStorage.getItem('authToken'));
      this.authLoaded = true;
    }
  }

  logOut(): Observable<boolean> {
    return this.wsHttp.get(this.logoutUrl)
      .map(resp => {
        this.clearAuthToken();
        this.isAuthenticated.next(false);
        return true;
      });
  }

  forgotPassword(emailAddress: string) {
    let toSend = {
      email_address: emailAddress,
    };
    return this.wsHttp.post(this.forgotPasswordUrl, toSend)
      .catch(this.apiResponseService.extractApiError);
  }

  processForgotPasswordSuccess(response: Object) {
    return response;
  }

  public verifyForgotPasswordToken(emailToken: string, userUuid: string, newPassword: string): Observable<boolean> {
    let toSend = {
      email_token: emailToken,
      user_uuid: userUuid,
      new_password: newPassword
    };
    return this.wsHttp.post(this.verifyforgotPasswordUrl, toSend)
      .map(_ => true);
  }

  processVerifyForgotPasswordSuccess(response: Object) {
    return response;
  }

  setAuthToken(authToken: string) {
    this.authToken = authToken;
    this.wsHttp.authToken = authToken;
    localStorage.setItem('authToken', authToken);
  }

  public signUp(firstName: string, lastName: string, email: string, password: string, recaptchaResponse: string): Observable<any> {
    let toSend = {
      first_name: firstName,
      last_name: lastName,
      username: email,
      password: password,
      recaptcha_response: recaptchaResponse
    };
    return this.wsHttp.post(this.signUpUrl, toSend)
      .map(response => {
        console.log('Got response');
        console.log(response);
        return response;
      });
      // .map(this.apiResponseService.extractApiResponse)
      // .map(resp => this.processSignUpSuccess(resp))
      // .catch(this.apiResponseService.extractApiError);
  }

  public setupAccount(firstName: string, lastName: string, password: string, recaptchaResponse: string, emailToken: string, userUuid: string): Observable<any> {
    let toSend = {
      first_name: firstName,
      last_name: lastName,
      password: password,
      recaptcha_response: recaptchaResponse,
      email_token: emailToken,
      user_uuid: userUuid
    };
    return this.wsHttp.post(this.setupAccountUrl, toSend)
      .map(response => {
        console.log('Got response');
        console.log(response);
        return response;
      });
  }


  processSignUpSuccess(response: Object) {
    return response;
  }

  verifyEmail(emailToken: string, userUuid: string) {
    let toSend = {
      email_token: emailToken,
      user_uuid: userUuid
    };
    return this.wsHttp.post(this.verifyEmailUrl, toSend)
      .map(this.apiResponseService.extractApiResponse)
      .map(resp => this.processVerifyEmailSuccess(resp))
      .catch(this.apiResponseService.extractApiError);
  }

  processVerifyEmailSuccess(response: Object) {
    return response;
  }

  //////////
  // Re-write stuff below here
  //////////

  private broadcastAuthState(): void {
    this.authStateChange.next(this.authState);
  }

  get authState(): AuthState {
    return new AuthState(
      this._isAuthenticated,
      this._isAdmin,
      this._userUuid
    );
  }

}
