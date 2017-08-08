import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { AuthService } from "../../../services/api-services/auth.service";
import {Router, ActivatedRoute} from "@angular/router";
import {WsHttpService} from "../../../services/api-services/ws-http.service";
import {Organization} from "../../../services/api-services/models/organization.class";
import {OrganizationService} from "../../../services/api-services/organization.service";
import {Subscription} from "rxjs";
import {AuthState} from "../../../services/api-services/models/auth/auth-state.class";
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {QueryOrdering} from "../../../services/api-services/models/requests/query-ordering.class";
import {WsViewstateService} from "../../../services/ui-services/ws-viewstate.service";

@Component({
  selector: 'ws-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private organizations: ManyApiResponse<Organization[]>;
  private selectedOrganization: Organization;
  private _isOutstanding: boolean;
  private _authState: AuthState;
  private _orgUuid: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: WsHttpService,
    private changeDetector: ChangeDetectorRef,
    private orgService: OrganizationService,
    private viewstateService: WsViewstateService,
  ) {
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscriptions.push(this.http.isRequestOutstanding.subscribe(isOutstanding => this.isOutstanding = isOutstanding));
    this.subscriptions.push(this.authService.authStateChange.subscribe(authState => this.authState = authState));
    this.subscriptions.push(this.viewstateService.selectedOrganizationChange.subscribe(selectedOrg => this.selectedOrganization = selectedOrg));
  }

  private fetchOrganizations(): void {
    let ordering = new QueryOrdering('created', 'desc');
    this.orgService.getOrganizationsNew(1, [], null, ordering)
      .subscribe(organizations => this.organizations = organizations);
  }

  public onHomeClicked(): void {
    if (this.authState.isAuthenticated) {
      this.router.navigate(['/organizations/mine']);
    } else {
      this.router.navigate(['/greeting/log-in']);
    }
  }

  private onLogOutClicked(): void {
    this.authService.logOut()
      .subscribe(resp => this.router.navigate(['/greeting']));
  }

  private onSelectOrgClicked(organization: Organization): void {
    this.viewstateService.selectedOrganization = organization;
    this.router.navigate(['/topography/' + organization.uuid]);
  }

  private onTopographyClicked(): void {
    this.router.navigate(['/topography/' + this.selectedOrganization.uuid]);
  }

  get authState(): AuthState {
    return this._authState;
  }

  set authState(state: AuthState) {
    this._authState = state;
    if (state.isAuthenticated) {
      this.fetchOrganizations();
    }
  }

  get isOutstanding(): boolean {
    return this._isOutstanding;
  }

  set isOutstanding(newValue: boolean) {
    if (newValue != this._isOutstanding) {
      this._isOutstanding = newValue;
      this.changeDetector.detectChanges();
    }
  }

  get orgUuid(): string {
    return this._orgUuid;
  }

  set orgUuid(uuid: string) {
    this._orgUuid = uuid;
  }

  get shownSelectedOrgs(): Organization[] {
    if (!this.organizations) {
      return [];
    } else {
      return this.organizations.results.slice(0, 5);
    }
  }

}
