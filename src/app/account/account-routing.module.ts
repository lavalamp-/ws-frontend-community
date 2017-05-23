import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AuthGuardService } from "../services/guard-services/auth-guard.service";
import {AccountHomeComponent} from "./account-home/account-home.component";

const accountRoutes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: AccountHomeComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(accountRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
