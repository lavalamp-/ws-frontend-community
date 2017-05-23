import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrgSelectGuardService} from "./org-select-guard.service";
import {AuthGuardService} from "./auth-guard.service";
import {AdminGuardService} from "./admin-guard.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    OrgSelectGuardService,
    AuthGuardService,
    AdminGuardService,
  ]
})
export class GuardServicesModule { }
