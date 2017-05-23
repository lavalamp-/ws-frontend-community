import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {OrganizationService} from "../../../services/api-services/organization.service";
import {Organization} from "../../../services/api-services/models/organization.class";
import {OrganizationPermission} from "../../../services/api-services/models/organization-permission.class";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'ws-manage-users-dialog',
  templateUrl: './manage-users-dialog.component.html',
  styleUrls: ['./manage-users-dialog.component.sass']
})
export class ManageUsersDialogComponent implements OnInit {

  public organization: Organization;
  private userPermissions: OrganizationPermission[];

  constructor(
    public dialogRef: MdDialogRef<ManageUsersDialogComponent>,
    public orgService: OrganizationService,
    public notifyService: NotificationsService,
  ) { }

  ngOnInit() {
    this.fetchPermissions();
  }

  private fetchPermissions(): void {
    this.orgService.getUserPermissions(this.organization.uuid)
      .subscribe(permissions => {
        console.log('Got permissions');
        console.log(permissions);
        this.userPermissions = permissions;
      })
  }

  private onPermissionsChanged(event: any): void {
    this.orgService.updateUserPermissions(this.organization.uuid, event[0].user_uuid, event[1])
      .subscribe(
        permissions => this.userPermissions = permissions,
        error => this.notifyService.error('Error', error.detail)
      );
  }

  private onUserAdded(userEmail: string): void {
    this.orgService.addUser(this.organization.uuid, userEmail)
      .subscribe(
        permissions => this.userPermissions = permissions,
        error => this.notifyService.error('Error', error.detail)
      );
  }

  private onUserRemoved(userUuid: string): void {
    this.orgService.removeUser(this.organization.uuid, userUuid)
      .subscribe(
        permissions => this.userPermissions = permissions,
        error => this.notifyService.error('Error', error.detail)
      );
  }

}
