import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WsFormsModule } from './components/ws-forms/ws-forms.module';
import { ApiServicesModule } from "./services/api-services/api-services.module";
import { WsSectionsModule } from "./components/ws-sections/ws-sections.module";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "@angular/material";
import { OrganizationsModule } from "./organizations/organizations.module";
import { GreetingModule } from "./greeting/greeting.module";
import { AccountModule } from './account/account.module';
import { SimpleNotificationsModule } from "angular2-notifications";
import { APP_CONFIG, WsAppConfig } from './app.config';
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";
import { ModalModule } from "angular2-modal";
import { WsDialogsModule } from "./components/ws-dialogs/ws-dialogs.module";
import { WsWidgetsModule } from "./components/ws-widgets/ws-widgets.module";
import {Logger} from "angular2-logger/core";
import { ReCaptchaModule } from 'angular2-recaptcha';
import {AdminModule} from "./admin/admin.module";
import {TopographyModule} from "./topography/topography.module";
import {WsChartsModule} from "./components/ws-charts/ws-charts.module";
import {ChartsModule} from "ng2-charts";
import {WsTablesModule} from "./components/ws-tables/ws-tables.module";
import {DataServicesModule} from "./services/data-services/data-services.module";
import {FileUploadModule} from 'ng2-file-upload';
import {Ng2ImgFallbackModule} from "ng2-img-fallback";
import {GuardServicesModule} from "./services/guard-services/guard-services.module";
import {UiServicesModule} from "./services/ui-services/ui-services.module";
import {CustomFormsModule} from "ng2-validation";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    WsFormsModule,
    ApiServicesModule,
    WsSectionsModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    OrganizationsModule,
    GreetingModule,
    SimpleNotificationsModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    WsDialogsModule,
    WsWidgetsModule,
    ReCaptchaModule,
    AccountModule,
    AdminModule,
    TopographyModule,
    WsChartsModule,
    ChartsModule,
    WsTablesModule,
    DataServicesModule,
    FileUploadModule,
    Ng2ImgFallbackModule,
    GuardServicesModule,
    UiServicesModule,
    CustomFormsModule,
  ],
  exports: [
  ],
  providers: [
    Logger,
    {
      provide: APP_CONFIG,
      useValue: WsAppConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
