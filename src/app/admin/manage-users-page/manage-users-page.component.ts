import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../services/api-services/admin.service";
import {ManageUsersResponse, UserData} from "../../services/api-services/models/admin/manage-users-response";
import {MdDialogRef, MdDialog} from "@angular/material";
import {ConfirmDialogComponent} from "../../components/ws-dialogs/confirm-dialog/confirm-dialog.component";
import {NotificationsService} from "angular2-notifications";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";
import {WsDialogService} from "../../components/ws-dialogs/ws-dialog.service";
import {QueryFilter} from "../../services/api-services/models/requests/query-filter.class";

@Component({
  selector: 'ws-manage-users-page',
  templateUrl: './manage-users-page.component.html',
  styleUrls: ['./manage-users-page.component.css']
})
export class ManageUsersPageComponent implements OnInit {

  private dialogRef: MdDialogRef<ConfirmDialogComponent>;
  private users: UserData[];

  constructor(
    private adminService: AdminService,
    public dialog: MdDialog,
    private titleService: WsTitleService,
    private breadcrumbsService: WsBreadcrumbsService,
    private dialogService: WsDialogService,
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.submitGetManageUsers();
    this.titleService.currentTitle = 'Manage Users';
    this.breadcrumbsService.setBreadcrumbsForManageUsers();
  }

  submitGetManageUsers() {
    this.adminService.getManageUsers().subscribe(
      (data) => this.onGetManageUsersSuccess(data),
      (err) => this.onGetManageUsersFailure(err)
    );
  }

  onGetManageUsersSuccess(response: ManageUsersResponse) {
    console.log(response);
    this.users = response.users;
  }

  onGetManageUsersFailure(response: Object) {
    console.log(response);
  }

  private onOpenPaymentsDialogClicked(): void {
  }

  onClickEnableUser(user: UserData) {
    this.adminService.postManageUsersEnableDisable(
      true,
      user.uuid
    ).subscribe(
      (data) => this.onEnableUsersSuccess(data),
      (err) => this.onEnableUsersFailure(err)
    );
  }

  onEnableUsersSuccess(response: Object) {
    console.log(response);
    this.submitGetManageUsers();
  }

  onEnableUsersFailure(response: Object) {
    console.log(response);
  }

  onClickDisableUser(user: UserData) {
    this.adminService.postManageUsersEnableDisable(
      false,
      user.uuid
    ).subscribe(
      (data) => this.onDisableUsersSuccess(data),
      (err) => this.onDisableUsersFailure(err)
    );
  }

  onDisableUsersSuccess(response: Object) {
    console.log(response);
    this.submitGetManageUsers();
  }

  onDisableUsersFailure(response: Object) {
    console.log(response);
  }

  onClickDeleteUser(user: UserData) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
      width: '300px',
      height: '200px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitDeleteUser(user);
      }
      this.dialogRef = null;
    });
  }

  submitDeleteUser(user: UserData) {
    this.adminService.postManageUsersDeleteUser(
      user.uuid
    ).subscribe(
      (data) => this.onDeleteUserSuccess(data),
      (err) => this.onDeleteUserFailure(err)
    );
  }

  onDeleteUserSuccess(response: Object) {
    this.submitGetManageUsers();
  }

  onDeleteUserFailure(response: Object) {
    console.log(response);
  }

  onClickResendVerificationEmail(user: UserData) {
    this.adminService.postManageUsersResendVerificationEmail(
      user.uuid
    ).subscribe(
      (data) => this.onResendVerificationEmailSuccess(data),
      (err) => this.onResendVerificationEmailFailure(err)
    );
  }

  onResendVerificationEmailSuccess(response: Object) {
  }

  onResendVerificationEmailFailure(response: Object) {
    console.log(response);
  }

  private onExportDataClicked(): void {
    let queryFilters = [];
    queryFilters.push(new QueryFilter('filter_key', 'filter_value', 'Foobar!'));
    queryFilters.push(new QueryFilter('filter_key', 'filter_value', 'This is a story all about how my life got flipped turned upside down'));
    let fields = [];
    for (let i=0; i<40; i++) {
      fields.push('awesome_field_name');
    }
    queryFilters.push(new QueryFilter('filter_key', 'filter_value', 'Whatchu talkin bout holmes'));
    queryFilters.push(new QueryFilter('filter_key', 'filter_value', 'Yea dog that sounds great howboutchu'));
    queryFilters.push(new QueryFilter('filter_key', 'filter_value', 'Nahhhhh you aint mean that'));
    this.dialogService.showExportDataDialog(
      '/foo/bar/baz',
      queryFilters,
      null,
      'searchysearch',
      fields
    );
  }

}
