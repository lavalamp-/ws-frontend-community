import {Component, OnInit, OnDestroy} from '@angular/core';
import { WsTitleService } from "../services/ui-services/ws-title.service";
import {Subscription} from "rxjs";
import {Breadcrumb} from "../services/ui-services/models/breadcrumb";
import {fadeInOut} from "../animations";
import {WsBreadcrumbsService} from "../services/ui-services/ws-breadcrumbs.service";

@Component({
  selector: 'ws-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  host: {
    '[@fadeInOut]': 'true'
  },
  animations: [
    fadeInOut,
  ],
  styles: [':host { width: 100% }']
})
export class AdminComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[];
  private breadcrumbs: Breadcrumb[];
  private title: string;

  constructor(
    private titleService: WsTitleService,
    private breadcrumbsService: WsBreadcrumbsService,
  ) {
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscriptions = [];
    this.subscriptions.push(this.titleService.currentTitleSubject.subscribe(title => this.title = title));
    this.subscriptions.push(this.breadcrumbsService.breadcrumbsChanged.subscribe(crumbs => this.breadcrumbs = crumbs));
  }

}
