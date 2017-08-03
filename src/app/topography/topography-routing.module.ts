import {Routes, RouterModule} from "@angular/router";
import {TopographyComponent} from "./topography.component";
import {AuthGuardService} from "../services/guard-services/auth-guard.service";
import {TopographyHomeComponent} from "./topography-home/topography-home.component";
import {NgModule} from "@angular/core";
import {TopographyWebApplicationsComponent} from "./topography-web-applications/topography-web-applications.component";
import {TopographyWebApplicationComponent} from "./topography-web-application/topography-web-application.component";
import {TopographyWebAppsListComponent} from "./topography-web-apps-list/topography-web-apps-list.component";
import {TopographySslSupportListComponent} from "./topography-ssl-support-list/topography-ssl-support-list.component";
import {TopographySslSupportDetailsComponent} from "./topography-ssl-support-details/topography-ssl-support-details.component";
import {TopographyWebAppDetailsComponent} from "./topography-web-app-details/topography-web-app-details.component";
import {TopographyDomainNamesListComponent} from "./topography-domain-names-list/topography-domain-names-list.component";

const topographyRoutes: Routes = [
  {
    path: 'topography',
    component: TopographyComponent,
    canActivate: [
      AuthGuardService,
    ],
    children: [
      {
        path: '',
        redirectTo: '/organizations/mine',
        pathMatch: 'full',
      },
      {
        path: ':orgId/domain-names',
        component: TopographyDomainNamesListComponent,
      },
      {
        path: ':orgId/web-applications',
        component: TopographyWebApplicationsComponent
      },
      {
        path: ':orgId/web-application/:webAppId',
        component: TopographyWebApplicationComponent,
      },
      {
        path: ':orgId/web-apps',
        component: TopographyWebAppsListComponent,
      },
      {
        path: ':orgId/web-apps/:webAppId',
        component: TopographyWebAppDetailsComponent,
      },
      {
        path: ':orgId/ssl-support',
        component: TopographySslSupportListComponent,
      },
      {
        path: ':orgId/ssl-support/:serviceId',
        component: TopographySslSupportDetailsComponent,
      },
      {
        path: ':orgId',
        component: TopographyHomeComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(topographyRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TopographyRoutingModule { }
