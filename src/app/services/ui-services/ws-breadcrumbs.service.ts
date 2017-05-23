import { Injectable } from '@angular/core';
import {NavigationEnd} from "@angular/router";
import {Breadcrumb} from "./models/breadcrumb";
import {Logger} from "angular2-logger/core";
import {WsCacheService} from "../data-services/ws-cache.service";
import {Subject, BehaviorSubject} from "rxjs";
import {WebService} from "../api-services/models/web-service.interface";
import {Organization} from "../api-services/models/organization.class";
import {SslSupport} from "../api-services/models/ssl-support.class";

@Injectable()
export class WsBreadcrumbsService {

  private _currentBreadcrumbs: Breadcrumb[];
  public breadcrumbsChanged: Subject<Breadcrumb[]> = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(
    private logger: Logger,
    private cacheService: WsCacheService
  ) { }

  private getBreadcrumbForAccountSettings(): Breadcrumb {
    return {
      url: '/account/settings',
      label: 'Account Settings',
    };
  }

  private getBreadcrumbForManageUsers(): Breadcrumb {
    return {
      url: '/admin/manage-users',
      label: 'Manage Users',
    };
  }

  private getBreadcrumbForOrderCheckout(organizationUuid: string, orderUuid: string): Breadcrumb {
    return {
      url: '/organizations/' + organizationUuid + '/check-out/' + orderUuid,
      label: 'Check Out'
    };
  }

  private getBreadcrumbForMyAccountHome(): Breadcrumb {
    return {
      url: '/account/home',
      label: 'Manage My Account',
    };
  }

  private getBreadcrumbForMyOrganizations(): Breadcrumb {
    return {
      url: '/organizations/mine',
      label: 'Manage Organizations'
    };
  }

  private getBreadcrumbForOrganizationDetails(organization: Organization): Breadcrumb {
    return {
      url: '/organizations/' + organization.uuid,
      label: organization.name
    };
  }

  private getBreadcrumbForSslSupportDetails(orgUuid: string, sslSupport: SslSupport): Breadcrumb {
    return {
      url: '/topography/' + orgUuid + '/ssl-support/' + sslSupport.uuid,
      label: sslSupport.endpoint,
    };
  }

  private getBreadcrumbForSslSupportList(orgUuid: string): Breadcrumb {
    return {
      url: '/topography/' + orgUuid + '/ssl-support',
      label: 'SSL Support',
    };
  }

  private getBreadcrumbForTopographyHome(orgUuid: string): Breadcrumb {
    return {
      url: '/topography/' + orgUuid,
      label: 'Topography Home',
    };
  }

  private getBreadcrumbForWebApplications(orgUuid: string): Breadcrumb {
    return {
      url: '/topography/' + orgUuid + '/web-applications',
      label: 'Web Applications',
    };
  }

  private getBreadcrumbForWebAppDetails(webService: WebService): Breadcrumb {
    return {
      url: '/topography/' + webService.org_uuid + '/web-app/' + webService.uuid,
      label: webService.url,
    };
  }

  private getBreadcrumbForWebAppsList(orgUuid: string): Breadcrumb {
    return {
      url: '/topography/' + orgUuid + '/web-apps/',
      label: 'Web Applications',
    }
  }

  private getBreadcrumbForWebService(orgUuid: string, appUuid: string, url: string): Breadcrumb {
    return {
      url: '/topography/' + orgUuid + '/web-application/' + appUuid,
      label: url,
    };
  }

  public setBreadcrumbsForAccountSettings(): void {
    this.currentBreadcrumbs = [this.getBreadcrumbForAccountSettings()];
  }

  public setBreadcrumbsForManageUsers(): void {
    this.currentBreadcrumbs = [this.getBreadcrumbForManageUsers()];
  }

  public setBreadcrumbsForMyAccountHome(): void {
    this.currentBreadcrumbs = [this.getBreadcrumbForMyAccountHome()];
  }

  public setBreadcrumbsForMyOrganizations(): void {
    this.currentBreadcrumbs = [this.getBreadcrumbForMyOrganizations()];
  }

  public setBreadcrumbsForOrderCheckout(organization: Organization, orderUuid: string): void {
    this.currentBreadcrumbs = [
      this.getBreadcrumbForMyOrganizations(),
      this.getBreadcrumbForOrganizationDetails(organization),
      this.getBreadcrumbForOrderCheckout(organization.uuid, orderUuid),
    ]
  }

  public setBreadcrumbsForOrganizationDetails(organization: Organization): void {
    this.currentBreadcrumbs = [
      this.getBreadcrumbForMyOrganizations(),
      this.getBreadcrumbForOrganizationDetails(organization),
    ];
  }

  public setBreadcrumbsForSslSupportList(orgUuid: string): void {
    this.currentBreadcrumbs = [
      this.getBreadcrumbForTopographyHome(orgUuid),
      this.getBreadcrumbForSslSupportList(orgUuid),
    ];
  }

  public setBreadcrumbsForSslSupportDetails(orgUuid: string, sslSupport: SslSupport): void {
    this.currentBreadcrumbs = [
      this.getBreadcrumbForTopographyHome(orgUuid),
      this.getBreadcrumbForSslSupportList(orgUuid),
      this.getBreadcrumbForSslSupportDetails(orgUuid, sslSupport),
    ];
  }

  public setBreadcrumbsForTopographyHome(orgUuid: string): void {
    this.currentBreadcrumbs = [this.getBreadcrumbForTopographyHome(orgUuid)];
  }

  public setBreadcrumbsForWebApplication(orgUuid: string, appUuid: string, url: string): void {
    let breadcrumbs = [
      this.getBreadcrumbForTopographyHome(orgUuid),
      this.getBreadcrumbForWebApplications(orgUuid),
      this.getBreadcrumbForWebService(orgUuid, appUuid, url)
    ];
    this.currentBreadcrumbs = breadcrumbs;
  }

  public setBreadcrumbsForWebApplications(orgUuid: string): void {
    let breadcrumbs = [
      this.getBreadcrumbForTopographyHome(orgUuid),
      this.getBreadcrumbForWebApplications(orgUuid),
    ];
    this.currentBreadcrumbs = breadcrumbs;
  }

  public setBreadcrumbsForWebAppDetails(webService: WebService): void {
    this.currentBreadcrumbs = [
      this.getBreadcrumbForTopographyHome(webService.org_uuid),
      this.getBreadcrumbForWebAppsList(webService.org_uuid),
      this.getBreadcrumbForWebAppDetails(webService),
    ];
  }

  public setBreadcrumbsForWebAppsList(orgUuid: string): void {
    this.currentBreadcrumbs = [
      this.getBreadcrumbForTopographyHome(orgUuid),
      this.getBreadcrumbForWebAppsList(orgUuid),
    ];
  }

  get currentBreadcrumbs(): Breadcrumb[] {
    return this._currentBreadcrumbs;
  }

  set currentBreadcrumbs(newCrumbs: Breadcrumb[]) {
    this._currentBreadcrumbs = newCrumbs;
    this.breadcrumbsChanged.next(newCrumbs);
  }

}
