import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "../api-services/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  failedAuthCheck(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/greeting/log-in']);
    return Observable.create(obs => obs.next(false));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.authService.authLoaded) {
      return this.authService.loadAndCheckAdmin().do(success => {
        if (!success) {
          this.failedAuthCheck(route, state);
        }
      });
    } else if (this.authService.isAuthenticated.getValue() && this.authService.isAdmin) {
      return Observable.create(obs => obs.next(true));
    } else {
      return this.failedAuthCheck(route, state);
    }
  }
}
