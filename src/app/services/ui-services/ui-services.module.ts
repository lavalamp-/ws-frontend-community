import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WsTitleService} from "./ws-title.service";
import {WsBreadcrumbsService} from "./ws-breadcrumbs.service";
import {WsViewstateService} from "./ws-viewstate.service";
import {WsCaseService} from "./ws-case.service";
import {WsColorService} from "./ws-color.service";
import {WsLabelsService} from "./ws-labels.service";
import {WsChipsService} from "./ws-chips.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    WsTitleService,
    WsBreadcrumbsService,
    WsViewstateService,
    WsCaseService,
    WsColorService,
    WsLabelsService,
    WsChipsService,
  ]
})
export class UiServicesModule { }
