export class AuthState {

  public isAuthenticated: boolean;
  public isAdmin: boolean;
  public userUuid: string;

  public constructor(
    isAuthenticated: boolean = false,
    isAdmin: boolean = false,
    userUuid: string = null,
  ) {
    this.isAuthenticated = isAuthenticated;
    this.isAdmin = isAdmin;
    this.userUuid = userUuid;
  }

  public static getEmpty(): AuthState {
    return new AuthState();
  }

}
