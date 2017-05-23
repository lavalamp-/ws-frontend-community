import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {OrganizationPermission} from "../../../../services/api-services/models/organization-permission.class";

@Component({
  selector: 'ws-permissions-toggle',
  templateUrl: './permissions-toggle.component.html',
  styleUrls: ['./permissions-toggle.component.sass']
})
export class PermissionsToggleComponent implements OnInit {

  @Input() userPermission: OrganizationPermission;
  @Output() permissionChanged = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onChange(selected: any): void {
    this.permissionChanged.emit(selected);
  }

  get permissionLevel(): string {
    if (this.userPermission.can_admin) {
      return 'admin';
    } else if (this.userPermission.can_scan) {
      return 'scan';
    } else if (this.userPermission.can_write) {
      return 'write';
    } else {
      return 'read';
    }
  }

}
