import {Component, OnInit, OnDestroy} from '@angular/core';
import {fadeInOut} from "../animations";
import {OrganizationService} from "../services/api-services/organization.service";
import {Breadcrumb} from "../services/ui-services/models/breadcrumb";
import {Router, NavigationEnd} from "@angular/router";
import {Subscription} from "rxjs";
import {WsBreadcrumbsService} from "../services/ui-services/ws-breadcrumbs.service";
import {WsCacheService} from "../services/data-services/ws-cache.service";
import {WsTitleService} from "../services/ui-services/ws-title.service";

@Component({
  selector: 'ws-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css'],
  host: {
    '[@fadeInOut]': 'true'
  },
  animations: [
    fadeInOut
  ],
  styles: [':host { width: 100%; }']
})
export class OrganizationsComponent implements OnInit, OnDestroy {

  private title: string;
  private subscriptions: Subscription[];
  private breadcrumbs: Breadcrumb[];

  constructor(
    private breadcrumbsService: WsBreadcrumbsService,
    private wsTitleService: WsTitleService,
  ) { }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscriptions = [];
    this.subscriptions.push(this.wsTitleService.currentTitleSubject.subscribe(title => this.title = title));
    this.subscriptions.push(this.breadcrumbsService.breadcrumbsChanged.subscribe(crumbs => this.breadcrumbs = crumbs));
  }

}
