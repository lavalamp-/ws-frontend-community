import {Component, OnInit, OnDestroy} from '@angular/core';
import {fadeInOut} from "../animations";
import {Subscription} from "rxjs";
import {Breadcrumb} from "../services/ui-services/models/breadcrumb";
import {WsBreadcrumbsService} from "../services/ui-services/ws-breadcrumbs.service";
import {WsTitleService} from "../services/ui-services/ws-title.service";

@Component({
  selector: 'ws-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  host: {
    '[@fadeInOut]': 'true'
  },
  animations: [
    fadeInOut
  ],
  styles: [':host { width: 100% }']
})
export class AccountComponent implements OnInit, OnDestroy {

  private title: string;
  private subscriptions: Subscription[];
  private breadcrumbs: Breadcrumb[];

  constructor(
    private breadcrumbsService: WsBreadcrumbsService,
    private titleService: WsTitleService,
  ) { }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscriptions = [];
    this.subscriptions.push(this.breadcrumbsService.breadcrumbsChanged.subscribe(crumbs => this.breadcrumbs = crumbs));
    this.subscriptions.push(this.titleService.currentTitleSubject.subscribe(title => this.title = title));
  }

}
