export class AuthState {

  public isAuthenticated: boolean;
  public isAdmin: boolean;
  public isEnterprise: boolean;
  public userUuid: string;

  public constructor(
    isAuthenticated: boolean = false,
    isAdmin: boolean = false,
    isEnterprise: boolean = false,
    userUuid: string = null,
  ) {
    this.isAuthenticated = isAuthenticated;
    this.isAdmin = isAdmin;
    this.isEnterprise = isEnterprise;
    this.userUuid = userUuid;
  }

  public static getEmpty(): AuthState {
    return new AuthState();
  }

}
