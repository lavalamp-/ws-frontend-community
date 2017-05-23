import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicTableComponent } from './basic-table/basic-table.component';
import {WsTableService} from "./ws-table.service";
import {WsWidgetsModule} from "../ws-widgets/ws-widgets.module";
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFooterComponent } from './table-footer/table-footer.component';

@NgModule({
  imports: [
    CommonModule,
    WsWidgetsModule
  ],
  declarations: [BasicTableComponent, TableHeaderComponent, TableFooterComponent],
  providers: [
    WsTableService
  ],
  exports: [
    BasicTableComponent,
    TableHeaderComponent,
    TableFooterComponent,
  ]
})
export class WsTablesModule { }
