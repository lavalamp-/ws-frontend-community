import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {WsViewstateService} from "../ui-services/ws-viewstate.service";

@Injectable()
export class OrgSelectGuardService implements CanActivate {

  constructor(
    private router: Router,
    private viewstateService: WsViewstateService,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let toReturn = !!this.viewstateService.selectedOrganization;
    if (!toReturn) {
      this.router.navigate(['/organizations']);
    }
    return true;
  }

}
