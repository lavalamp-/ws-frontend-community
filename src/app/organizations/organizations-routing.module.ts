import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationsComponent } from './organizations.component';
import { AuthGuardService } from "../services/guard-services/auth-guard.service";
import {OrgDetailsComponent} from "./org-details/org-details.component";
import {OrgOrderCheckoutComponent} from "./org-order-checkout/org-order-checkout.component";
import {MyOrganizationsListComponent} from "./my-organizations-list/my-organizations-list.component";

const organizationsRoutes: Routes = [
  {
    path: 'organizations',
    component: OrganizationsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'mine',
        pathMatch: 'full'
      },
      {
        path: 'mine',
        component: MyOrganizationsListComponent,
      },
      {
        path: ':orgId/check-out/:orderId',
        component: OrgOrderCheckoutComponent,
      },
      {
        path: ':orgId',
        component: OrgDetailsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(organizationsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrganizationsRoutingModule { }
