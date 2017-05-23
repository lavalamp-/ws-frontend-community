import { Component, OnInit } from '@angular/core';
import {OrganizationService} from "../../services/api-services/organization.service";
import {Organization} from "../../services/api-services/models/organization.class";
import {flyInOut, fadeInOut} from "../../animations";
import {Router, ActivatedRoute} from "@angular/router";
import {WsViewstateService} from "../../services/ui-services/ws-viewstate.service";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {ManyApiResponse} from "../../services/api-services/models/responses/many-api-response.interface";
import {FormGroup} from "@angular/forms";
import {WsDialogService} from "../../components/ws-dialogs/ws-dialog.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";

@Component({
  selector: 'ws-my-organizations',
  templateUrl: './my-organizations.component.html',
  styleUrls: ['./my-organizations.component.css'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap'
  },
  animations: [
    fadeInOut,
  ]
})
export class MyOrganizationsComponent implements OnInit {

  private _currentOrganizationsPage: number = 1;
  private organizationForm: FormGroup;
  private organizationFormErrors: any;
  private organizations: Organization[];
  private _organizatonsApiResponse: ManyApiResponse<Organization[]>;

  constructor(
    private orgService: OrganizationService,
    private router: Router,
    private viewstateService: WsViewstateService,
    private wsTitleService: WsTitleService,
    private route: ActivatedRoute,
    private dialogService: WsDialogService,
    private breadcrumbsService: WsBreadcrumbsService,
  ) { }

  ngOnInit() {
    this.wsTitleService.currentTitle = 'Manage Organizations';
    this.fetchOrganizations();
    this.breadcrumbsService.setBreadcrumbsForMyOrganizations();
  }

  private deleteOrganization(organization: Organization): void {
    this.orgService.deleteOrganization(organization.uuid)
      .subscribe(_ => {
        this.fetchOrganizations();
      });
  }

  private fetchOrganizations(): void {
    this.orgService.getOrganizations(this.currentOrganizationsPage)
      .subscribe(response => this.organizationsApiResponse = response);
  }

  private onNewOrganizationAvailable(): void {
    this.fetchOrganizations();
  }

  private onNewOrganizationClicked(): void {
    this.organizationFormErrors = null;
    this.orgService.createOrganization(
      this.organizationForm.value.name,
      this.organizationForm.value.description,
    ).subscribe(
      _ => {
        this.fetchOrganizations();
        this.organizationForm.reset();
      },
      error => this.organizationFormErrors = error,
    )
  }

  private onOrganizationConfigure(organization: Organization): void {
    this.router.navigate(['../' + organization.uuid], {relativeTo: this.route});
  }

  private onOrganizationDelete(organization: Organization): void {
    this.dialogService.showConfirmDeleteOrganizationDialog(organization)
      .subscribe(result => {
        if (result === true) {
          this.deleteOrganization(organization);
        }
      });
  }

  private onOrganizationEnterPressed(): void {
    if (this.organizationForm.valid) {
      this.onNewOrganizationClicked();
    }
  }

  private onOrganizationSelected(organization: Organization): void {
    this.viewstateService.selectedOrganization = organization;
    this.router.navigate(['/topography/' + organization.uuid]);
  }

  private onPageClicked(pageNumber: number): void {
    this.currentOrganizationsPage = pageNumber;
  }

  get currentOrganizationsPage(): number {
    return this._currentOrganizationsPage;
  }

  set currentOrganizationsPage(newValue: number) {
    this._currentOrganizationsPage = newValue;
    this.fetchOrganizations();
  }

  get organizationsApiResponse(): ManyApiResponse<Organization[]> {
    return this._organizatonsApiResponse;
  }

  set organizationsApiResponse(apiResponse: ManyApiResponse<Organization[]>) {
    this._organizatonsApiResponse = apiResponse;
    this.organizations = apiResponse.results;
  }

  get showPagination(): boolean {
    if (!this.organizationsApiResponse) {
      return false;
    } else if (this.organizationsApiResponse.last_page == 1) {
      return false;
    } else {
      return true;
    }
  }

}
