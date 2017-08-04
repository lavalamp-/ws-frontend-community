import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopographyHomeComponent } from './topography-home/topography-home.component';
import { TopographyRoutingModule } from "./topography-routing.module";
import { TopographyComponent } from "./topography.component";
import { WsWidgetsModule } from "../components/ws-widgets/ws-widgets.module";
import { WsChartsModule } from "../components/ws-charts/ws-charts.module";
import { WsTablesModule } from "../components/ws-tables/ws-tables.module";
import {MaterialModule} from "@angular/material";
import { ScreenshotListComponent } from './components/screenshot-list/screenshot-list.component';
import { TopographyTypeCardComponent } from './components/topography-type-card/topography-type-card.component';
import { WebApplicationsCardComponent } from './components/web-applications-card/web-applications-card.component';
import {TopographyWebApplicationsComponent} from "./topography-web-applications/topography-web-applications.component";
import { WebApplicationFiltersTabsComponent } from './components/web-application-filters-tabs/web-application-filters-tabs.component';
import {WebServiceNetworksDonutComponent} from "./components/web-service-networks-donut/web-service-networks-donut.component";
import {WebServicePortsDonutComponent} from "./components/web-service-ports-donut/web-service-ports-donut.component";
import { WebServiceSslSupportDonutComponent } from './components/web-service-ssl-support-donut/web-service-ssl-support-donut.component';
import { WebApplicationsListComponent } from './components/web-applications-list/web-applications-list.component';
import { TopographyWebApplicationComponent } from './topography-web-application/topography-web-application.component';
import { WebApplicationTechnologiesComponent } from './components/web-application-technologies/web-application-technologies.component';
import { WebApplicationContentTypesDonutComponent } from './components/web-application-content-types-donut/web-application-content-types-donut.component';
import { WebApplicationResponseCodeDonutComponent } from './components/web-application-response-code-donut/web-application-response-code-donut.component';
import { HttpTransactionsListComponent } from './components/http-transactions-list/http-transactions-list.component';
import { SslSupportCardComponent } from './components/ssl-support-card/ssl-support-card.component';
import { TopographySslSupportListComponent } from './topography-ssl-support-list/topography-ssl-support-list.component';
import { SslSupportSummaryRowComponent } from './components/ssl-support-summary-row/ssl-support-summary-row.component';
import { SslSupportListComponent } from './components/ssl-support-list/ssl-support-list.component';
import { SslSupportSubjectOrgDonutComponent } from './components/ssl-support-subject-org-donut/ssl-support-subject-org-donut.component';
import { SslSupportNetworkPortDonutComponent } from './components/ssl-support-network-port-donut/ssl-support-network-port-donut.component';
import { TopographyWebAppsListComponent } from './topography-web-apps-list/topography-web-apps-list.component';
import { WebAppListComponent } from './components/web-app-list/web-app-list.component';
import { WebAppSummaryRowComponent } from './components/web-app-summary-row/web-app-summary-row.component';
import {Ng2ImgFallbackModule} from "ng2-img-fallback";
import { TopographySslSupportDetailsComponent } from './topography-ssl-support-details/topography-ssl-support-details.component';
import { AnySummaryRowComponent } from './components/any-summary-row/any-summary-row.component';
import { AnyListComponent } from './components/any-list/any-list.component';
import { TopographyWebAppDetailsComponent } from './topography-web-app-details/topography-web-app-details.component';
import { HtmlWebResourceSummaryRowComponent } from './components/html-web-resource-summary-row/html-web-resource-summary-row.component';
import { GenericWebResourceSummaryRowComponent } from './components/generic-web-resource-summary-row/generic-web-resource-summary-row.component';
import { TopographyDomainNamesListComponent } from './topography-domain-names-list/topography-domain-names-list.component';
import { DomainNameCardComponent } from './components/domain-name-card/domain-name-card.component';
import { DomainNameSummaryRowComponent } from './components/domain-name-summary-row/domain-name-summary-row.component';
import { DomainNameListComponent } from './components/domain-name-list/domain-name-list.component';


@NgModule({
  imports: [
    CommonModule,
    TopographyRoutingModule,
    WsWidgetsModule,
    WsChartsModule,
    WsTablesModule,
    MaterialModule.forRoot(),
    Ng2ImgFallbackModule,
  ],
  declarations: [
    TopographyComponent,
    TopographyHomeComponent,
    ScreenshotListComponent,
    TopographyTypeCardComponent,
    WebApplicationsCardComponent,
    TopographyWebApplicationsComponent,
    WebApplicationFiltersTabsComponent,
    WebServiceNetworksDonutComponent,
    WebServicePortsDonutComponent,
    WebServiceSslSupportDonutComponent,
    WebApplicationsListComponent,
    TopographyWebApplicationComponent,
    WebApplicationTechnologiesComponent,
    WebApplicationContentTypesDonutComponent,
    WebApplicationResponseCodeDonutComponent,
    HttpTransactionsListComponent,
    SslSupportCardComponent,
    TopographySslSupportListComponent,
    SslSupportSummaryRowComponent,
    SslSupportListComponent,
    SslSupportSubjectOrgDonutComponent,
    SslSupportNetworkPortDonutComponent,
    TopographyWebAppsListComponent,
    WebAppListComponent,
    WebAppSummaryRowComponent,
    TopographySslSupportDetailsComponent,
    AnySummaryRowComponent,
    AnyListComponent,
    TopographyWebAppDetailsComponent,
    HtmlWebResourceSummaryRowComponent,
    GenericWebResourceSummaryRowComponent,
    TopographyDomainNamesListComponent,
    DomainNameCardComponent,
    DomainNameSummaryRowComponent,
    DomainNameListComponent,
  ]
})
export class TopographyModule { }
