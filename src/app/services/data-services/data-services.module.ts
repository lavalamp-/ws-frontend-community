import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WsCacheService} from "./ws-cache.service";
import {WsStringHelperService} from "./ws-string-helper.service";
import {DownloadHelperService} from "./download-helper.service";
import {SortingHelperService} from "./sorting-helper.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    WsCacheService,
    WsStringHelperService,
    DownloadHelperService,
    SortingHelperService,
  ]
})
export class DataServicesModule { }
