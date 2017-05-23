export class MyAccountViewstate {

  public tabIndex: number;
  public managePaymentsPage: number;

  constructor(
    managePaymentsPage: number = 1,
    tabIndex: number = 0,
  ) {
    this.managePaymentsPage = managePaymentsPage;
    this.tabIndex = tabIndex;
  }

}
