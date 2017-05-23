import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersPageComponent } from './manage-users-page/manage-users-page.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {WsDialogsModule} from "../components/ws-dialogs/ws-dialogs.module";
import {WsFormsModule} from "../components/ws-forms/ws-forms.module";
import {WsWidgetsModule} from "../components/ws-widgets/ws-widgets.module";
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    WsFormsModule,
    WsDialogsModule,
    WsWidgetsModule,
    MaterialModule.forRoot()

  ],
  declarations: [
    AdminComponent,
    ManageUsersPageComponent
  ]
})
export class AdminModule { }
