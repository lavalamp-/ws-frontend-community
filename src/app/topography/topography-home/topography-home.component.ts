import {Component, OnInit, OnDestroy} from '@angular/core';
import {fadeInOut} from "../../animations";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";
import {Subscription} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {OrganizationService} from "../../services/api-services/organization.service";

@Component({
  selector: 'ws-topography-home',
  templateUrl: './topography-home.component.html',
  styleUrls: ['./topography-home.component.css'],
  host: {
    '[@fadeInOut]': 'true'
  },
  animations: [
    fadeInOut
  ],
  styles: [':host { width: 100% }']
})
export class TopographyHomeComponent implements OnInit, OnDestroy {

  private _orgUuid: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private titleService: WsTitleService,
    private breadcrumbsService: WsBreadcrumbsService,
    private route: ActivatedRoute,
    private orgService: OrganizationService,
    private router: Router,
  ) { }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.titleService.currentTitle = 'Topography Home';
    this.subscriptions.push(this.route.params.subscribe(params => this.orgUuid = params['orgId']));
  }

  private fetchOrganization(): void {
    this.orgService.getOrganization(this.orgUuid)
      .subscribe(
        _ => {},
        err => {
          if (err.status_code == 404) {
            this.router.navigate(['/organizations/mine']);
          }
        }
      )
  }

  get orgUuid(): string {
    return this._orgUuid;
  }

  set orgUuid(newValue: string) {
    this._orgUuid = newValue;
    this.breadcrumbsService.setBreadcrumbsForTopographyHome(newValue);
    this.fetchOrganization();
  }

}
