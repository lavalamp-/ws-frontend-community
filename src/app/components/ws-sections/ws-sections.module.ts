import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from "@angular/router";
import {WsWidgetsModule} from "../ws-widgets/ws-widgets.module";
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    WsWidgetsModule,
    MaterialModule.forRoot(),
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class WsSectionsModule { }
