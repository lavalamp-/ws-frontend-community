import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { AccountComponent } from './account.component';
import { WsFormsModule } from "../components/ws-forms/ws-forms.module";
import {WsWidgetsModule} from "../components/ws-widgets/ws-widgets.module";
import { AccountHomeComponent } from './account-home/account-home.component';
import {MaterialModule} from "@angular/material";
import { AddNewPaymentMethodComponent } from './components/add-new-payment-method/add-new-payment-method.component';
import { PaymentMethodCardComponent } from './components/payment-method-card/payment-method-card.component';
import { PaymentMethodsListComponent } from './components/payment-methods-list/payment-methods-list.component';
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
    AddNewPaymentMethodComponent,
    PaymentMethodCardComponent,
    PaymentMethodsListComponent,
    AccountSettingsComponent
  ]
})
export class AccountModule { }
