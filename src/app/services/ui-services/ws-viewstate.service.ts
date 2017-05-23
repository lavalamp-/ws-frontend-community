import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Organization} from "../api-services/models/organization.class";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class WsViewstateService {

  private _viewstateMap: any = {};
  private _selectedOrganization: Organization = null;
  public selectedOrganizationChange = new BehaviorSubject<Organization>(null);

  constructor(
    private router: Router,
  ) { }

  public getViewstate(): any {
    return this._viewstateMap[this.router.url];
  }

  public getViewstateByPath(path: string): any {
    return this._viewstateMap[path];
  }

  public setViewstate(viewstate: any): void {
    this._viewstateMap[this.router.url] = viewstate;
  }

  get selectedOrganization(): Organization {
    return this._selectedOrganization;
  }

  set selectedOrganization(organization: Organization) {
    this._selectedOrganization = organization;
    this.selectedOrganizationChange.next(this._selectedOrganization);
  }

  get viewstateMap(): any {
    return this._viewstateMap;
  }

}
