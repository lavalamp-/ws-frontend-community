import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "../api-services/auth.service";
import {Observable, Subject, BehaviorSubject} from "rxjs";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  )
  { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.authService.authLoaded) {
      return this.authService.loadAndCheck()
        .map(result => {
          if (!result) {
            this.authService.redirectUrl = state.url;
            this.router.navigate(['/greeting/log-in']);
            return false;
          } else {
            return true;
          }
        });
    } else {
      return Observable.create(obs => obs.next(this.authService.isAuthenticated.getValue()));
    }
  }

}
