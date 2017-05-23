import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {OrganizationPermission} from "../../../../services/api-services/models/organization-permission.class";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'ws-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.sass']
})
export class UserPermissionsComponent implements OnInit {

  private newUserForm: FormGroup;
  @Input() userPermissions: OrganizationPermission[];
  @Input() margin: number = 2;
  @Output() userRemoved = new EventEmitter;
  @Output() permissionsChanged = new EventEmitter;
  @Output() userAdded = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.newUserForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  private onAddUserClicked(): void {
    this.userAdded.emit(this.newUserForm.value.email);
  }

  private onPermissionsChanged(event: any): void {
    this.permissionsChanged.emit(event);
  }

  private onRemoveUserClicked(permission: OrganizationPermission): void {
    this.userRemoved.emit(permission.user_uuid);
  }

  private onNewUserKeyDown(event: any): void {
    if (event.keyCode == 13 && this.newUserForm.valid) {
      this.onAddUserClicked();
    }
  }

  get marginString(): string {
    return this.margin + 'px';
  }

}
