import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { AccountComponent } from './account.component';
import { WsFormsModule } from "../components/ws-forms/ws-forms.module";
import {WsWidgetsModule} from "../components/ws-widgets/ws-widgets.module";
import { AccountHomeComponent } from './account-home/account-home.component';
import {MaterialModule} from "@angular/material";
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    WsFormsModule,
    WsWidgetsModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    AccountComponent,
    SettingsPageComponent,
    AccountHomeComponent,
    AccountSettingsComponent
  ]
})
export class AccountModule { }
