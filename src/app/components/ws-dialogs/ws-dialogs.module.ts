import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MaterialModule } from "@angular/material";
import { LightboxDialogComponent } from './lightbox-dialog/lightbox-dialog.component';
import {Ng2ImgFallbackModule} from "ng2-img-fallback";
import { StrongConfirmDialogComponent } from './strong-confirm-dialog/strong-confirm-dialog.component';
import {WsDialogService} from "./ws-dialog.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import {FileUploadModule} from "ng2-file-upload";
import { ManageUsersDialogComponent } from './manage-users-dialog/manage-users-dialog.component';
import { UserPermissionsComponent } from './manage-users-dialog/user-permissions/user-permissions.component';
import { PermissionsToggleComponent } from './manage-users-dialog/permissions-toggle/permissions-toggle.component';
import { PaymentMethodDialogComponent } from './payment-method-dialog/payment-method-dialog.component';
import {WsFormsModule} from "../ws-forms/ws-forms.module";
import { ExportDataDialogComponent } from './export-data-dialog/export-data-dialog.component';
import {WsWidgetsModule} from "../ws-widgets/ws-widgets.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    Ng2ImgFallbackModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    WsFormsModule,
    WsWidgetsModule,
  ],
  declarations: [ConfirmDialogComponent, LightboxDialogComponent, StrongConfirmDialogComponent, UploadDialogComponent, ManageUsersDialogComponent, UserPermissionsComponent, PermissionsToggleComponent, PaymentMethodDialogComponent, ExportDataDialogComponent],
  exports: [
    ConfirmDialogComponent,
    LightboxDialogComponent,
    StrongConfirmDialogComponent,
    UploadDialogComponent,
    ManageUsersDialogComponent,
    UserPermissionsComponent,
    PaymentMethodDialogComponent,
    ExportDataDialogComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    LightboxDialogComponent,
    StrongConfirmDialogComponent,
    UploadDialogComponent,
    ManageUsersDialogComponent,
    PaymentMethodDialogComponent,
    ExportDataDialogComponent,
  ],
  providers: [
    WsDialogService,
  ]
})
export class WsDialogsModule { }
