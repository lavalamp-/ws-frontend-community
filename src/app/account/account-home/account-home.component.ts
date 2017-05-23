import { Component, OnInit } from '@angular/core';
import {fadeInOut} from "../../animations";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";
import {WsViewstateService} from "../../services/ui-services/ws-viewstate.service";
import {MyAccountViewstate} from "../../services/ui-services/models/viewstates/my-account-viewstate.class";

@Component({
  selector: 'ws-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.sass'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap',
  },
  animations: [
    fadeInOut,
  ]
})
export class AccountHomeComponent implements OnInit {

  private _tabIndex: number = 0;
  private _currentManagePaymentsPage: number = 1;

  constructor(
    private titleService: WsTitleService,
    private breadcrumbsService: WsBreadcrumbsService,
    private viewstateService: WsViewstateService,
  ) { }

  ngOnInit() {
    this.titleService.currentTitle = 'Manage Account';
    this.breadcrumbsService.setBreadcrumbsForMyAccountHome();
    this.loadViewstate();
  }

  private loadViewstate(): void {
    let viewstate = this.viewstateService.getViewstate();
    if (viewstate) {
      this._tabIndex = viewstate.tabIndex;
      this._currentManagePaymentsPage = viewstate.managePaymentsPage;
    }
  }

  private setViewstate(): void {
    this.viewstateService.setViewstate(this.viewstate);
  }

  get currentManagePaymentsPage(): number {
    return this._currentManagePaymentsPage;
  }

  set currentManagePaymentsPage(page: number) {
    if (page != this._currentManagePaymentsPage) {
      this._currentManagePaymentsPage = page;
      console.log('manage payments page changed');
      console.log(page);
      this.setViewstate();
    }
  }

  get tabIndex(): number {
    return this._tabIndex;
  }

  set tabIndex(tabIndex: number) {
    this._tabIndex = tabIndex;
    console.log('Tab index changed');
    console.log(tabIndex);
    this.setViewstate();
  }

  get viewstate(): MyAccountViewstate {
    return new MyAccountViewstate(
      this.currentManagePaymentsPage,
      this.tabIndex
    );
  }

}
