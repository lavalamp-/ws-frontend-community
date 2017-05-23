import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations.component';
import { OrganizationsRoutingModule } from "./organizations-routing.module";
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import {WsFormsModule} from "../components/ws-forms/ws-forms.module";
import { MyOrganizationsComponent } from './my-organizations/my-organizations.component';
import {WsDialogsModule} from "../components/ws-dialogs/ws-dialogs.module";
import {MaterialModule} from "@angular/material";
import {WsWidgetsModule} from "../components/ws-widgets/ws-widgets.module";
import {WsTablesModule} from "../components/ws-tables/ws-tables.module";
import { OrganizationNetworksComponent } from './components/organization-networks/organization-networks.component';
import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { OrganizationDomainNamesComponent } from './components/organization-domain-names/organization-domain-names.component';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { NetworksListComponent } from './components/networks-list/networks-list.component';
import { NetworksSummaryRowComponent } from './components/networks-summary-row/networks-summary-row.component';
import { DomainNameSummaryRowComponent } from './components/domain-name-summary-row/domain-name-summary-row.component';
import { DomainNameListComponent } from './components/domain-name-list/domain-name-list.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { OrgOrderCheckoutComponent } from './org-order-checkout/org-order-checkout.component';
import { OrganizationSummaryRowComponent } from './components/organization-summary-row/organization-summary-row.component';
import { MyOrganizationsListComponent } from './my-organizations-list/my-organizations-list.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    WsFormsModule,
    WsDialogsModule,
    WsWidgetsModule,
    MaterialModule.forRoot(),
    WsTablesModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    OrganizationsComponent,
    OrganizationDetailsComponent,
    OrganizationNetworksComponent,
    MyOrganizationsComponent,
    OrganizationNetworksComponent,
    OrganizationListComponent,
    OrganizationDomainNamesComponent,
    OrgDetailsComponent,
    NetworksListComponent,
    NetworksSummaryRowComponent,
    DomainNameSummaryRowComponent,
    DomainNameListComponent,
    OrgOrderCheckoutComponent,
    OrganizationSummaryRowComponent,
    MyOrganizationsListComponent,

  ]
})
export class OrganizationsModule { }
