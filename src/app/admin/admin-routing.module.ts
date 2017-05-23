import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManageUsersPageComponent } from "./manage-users-page/manage-users-page.component";
import { AuthGuardService } from "../services/guard-services/auth-guard.service";
import { AdminGuardService } from "../services/guard-services/admin-guard.service";

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardService],
    children: [
      {
        path: 'manage-users',
        component: ManageUsersPageComponent,

      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
