import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import {RouterModule} from "@angular/router";
import { ImageCardComponent } from './image-card/image-card.component';
import {MaterialModule} from "@angular/material";
import {Ng2ImgFallbackModule} from "ng2-img-fallback";
import { PaginationComponent } from './pagination/pagination.component';
import { BadgeComponent } from './badge/badge.component';
import { UsageBadgeComponent } from './usage-badge/usage-badge.component';
import { CountBadgeComponent } from './count-badge/count-badge.component';
import { DetailListComponent } from './detail-list/detail-list.component';
import {DetailListService} from "./detail-list.service";
import { QueryFilterBadgeComponent } from './query-filter-badge/query-filter-badge.component';
import { CheckComponent } from './check/check.component';
import { RequirementsCardComponent } from './requirements-card/requirements-card.component';
import { PasswordComplexityCardComponent } from './password-complexity-card/password-complexity-card.component';
import { CheckBadgeComponent } from './check-badge/check-badge.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { ManyResponseSummaryComponent } from './many-response-summary/many-response-summary.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DebounceInputComponent } from './debounce-input/debounce-input.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { ButtonComponent } from './button/button.component';
import { ExportOptionsComponent } from './export-options/export-options.component';
import { FilterSelectComponent } from './filter-select/filter-select.component';
import { SelectComponent } from './select/select.component';
import { OrderingComponent } from './ordering/ordering.component';
import { DetailListPanelComponent } from './detail-list-panel/detail-list-panel.component';
import { PreformattedPanelComponent } from './preformatted-panel/preformatted-panel.component';
import { PreformattedListPanelComponent } from './preformatted-list-panel/preformatted-list-panel.component';
import { UlPanelComponent } from './ul-panel/ul-panel.component';
import { ChipComponent } from './chip/chip.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    Ng2ImgFallbackModule,
  ],
  declarations: [
    LoadingSpinnerComponent,
    BreadcrumbsComponent,
    ImageCardComponent,
    PaginationComponent,
    BadgeComponent,
    UsageBadgeComponent,
    CountBadgeComponent,
    DetailListComponent,
    QueryFilterBadgeComponent,
    CheckComponent,
    RequirementsCardComponent,
    PasswordComplexityCardComponent,
    CheckBadgeComponent,
    FilterPanelComponent,
    ManyResponseSummaryComponent,
    PaginatorComponent,
    DebounceInputComponent,
    ButtonComponent,
    ExportOptionsComponent,
    FilterSelectComponent,
    SelectComponent,
    OrderingComponent,
    DetailListPanelComponent,
    PreformattedPanelComponent,
    PreformattedListPanelComponent,
    UlPanelComponent,
    ChipComponent
  ],
  exports: [
    LoadingSpinnerComponent,
    BreadcrumbsComponent,
    ImageCardComponent,
    PaginationComponent,
    BadgeComponent,
    UsageBadgeComponent,
    CountBadgeComponent,
    DetailListComponent,
    QueryFilterBadgeComponent,
    CheckComponent,
    RequirementsCardComponent,
    PasswordComplexityCardComponent,
    CheckBadgeComponent,
    FilterPanelComponent,
    ManyResponseSummaryComponent,
    PaginatorComponent,
    DebounceInputComponent,
    ButtonComponent,
    ExportOptionsComponent,
    FilterSelectComponent,
    SelectComponent,
    OrderingComponent,
    DetailListPanelComponent,
    PreformattedPanelComponent,
    PreformattedListPanelComponent,
    UlPanelComponent,
    ChipComponent,
  ],
  providers: [
    DetailListService,
  ]
})
export class WsWidgetsModule { }
