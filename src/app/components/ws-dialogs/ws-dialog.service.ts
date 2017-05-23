import {Injectable, Inject} from '@angular/core';
import {MdDialog, MdDialogRef} from "@angular/material";
import {Observable} from "rxjs";
import {LightboxDialogComponent} from "./lightbox-dialog/lightbox-dialog.component";
import {StrongConfirmDialogComponent} from "./strong-confirm-dialog/strong-confirm-dialog.component";
import {Organization} from "../../services/api-services/models/organization.class";
import {APP_CONFIG} from "../../app.config";
import {UploadDialogComponent} from "./upload-dialog/upload-dialog.component";
import {OrganizationService} from "../../services/api-services/organization.service";
import {NetworksUploadResponse} from "../../services/api-services/models/responses/networks-upload-response.interface";
import {NotificationsService} from "angular2-notifications";
import {ManageUsersDialogComponent} from "./manage-users-dialog/manage-users-dialog.component";
import {DomainsUploadResponse} from "../../services/api-services/models/responses/domains-upload-response.interface";
import {PaymentMethodDialogComponent} from "./payment-method-dialog/payment-method-dialog.component";
import {QueryFilter} from "../../services/api-services/models/requests/query-filter.class";
import {QueryOrdering} from "../../services/api-services/models/requests/query-ordering.class";
import {ExportDataDialogComponent} from "./export-data-dialog/export-data-dialog.component";

@Injectable()
export class WsDialogService {

  private mediumHeight: number = 400;
  private mediumWidth: number = 500;
  private dialogRefs: MdDialogRef<any>[] = [];

  constructor(
    private dialog: MdDialog,
    @Inject(APP_CONFIG) private config,
    private orgService: OrganizationService,
    private notifyService: NotificationsService
  ) { }

  private getConfiguration(): any {
    return {};
  }

  private getConfigurationForSize(size: string): any {
    let toReturn = this.getConfiguration;
    let dimensions = this.getDimensionsForSize(size);
    toReturn['width'] = dimensions[0].toString() + 'px';
    toReturn['height'] = dimensions[1].toString() + 'px';
    return toReturn;
  }

  private getDimensionsForMaxHeight(currentWidth: number, currentHeight: number, maxHeight: number): number[] {
    let multiplier = maxHeight / currentHeight;
    return [currentWidth * multiplier, maxHeight];
  }

  private getDimensionsForMaxWidth(currentWidth: number, currentHeight: number, maxWidth: number): number[] {
    let multiplier = maxWidth / currentWidth;
    return [maxWidth, currentHeight * multiplier];
  }

  private getDimensionsForSize(size: string): number[] {
    if (size == 'medium') {
      return [this.mediumWidth, this.mediumHeight];
    } else {
      throw 'No dimensions found for size of ' + size + '.';
    }
  }

  private getLightboxDimensions(imageWidth: number, imageHeight: number): number[] {
    let currentHeight = (window.screen.height) - (this.config.navbarHeight * 2);
    let maxHeight = this.config.lightboxMaxHeightPercent * currentHeight;
    if (imageHeight < maxHeight) {
      return [imageWidth, imageHeight];
    } else {
      let heightDifference = imageHeight - maxHeight;
      let reductionPercent = heightDifference / imageHeight;
      let newPercent = 1.0 - reductionPercent;
      return [imageWidth * newPercent, maxHeight];
    }
  }

  public showConfirmDeleteOrganizationDialog(organization: Organization, size: string = 'medium'): Observable<boolean> {
    return this.showStrongConfirmDialog(
      'Delete Organization',
      'Please confirm that you would like to delete the organization "' + organization.name + '". Once deleted, all data related to this organization will be removed from our servers.',
      organization.name,
      size
    );
  }

  public showExportDataDialog(exportUrl: string, queryFilters: QueryFilter[], queryOrdering: QueryOrdering, searchTerm: string, fields: string[]): Observable<any> {
    let dialogRef = this.dialog.open(ExportDataDialogComponent, {
      width: '80%'
    });
    dialogRef.componentInstance.exportUrl = exportUrl;
    dialogRef.componentInstance.queryFilters = queryFilters;
    dialogRef.componentInstance.queryOrdering = queryOrdering;
    dialogRef.componentInstance.searchTerm = searchTerm;
    dialogRef.componentInstance.fields = fields;
    return dialogRef.afterClosed();
  }

  public showLightboxDialog(imageWidth: number, imageHeight: number, imageUrl: string): void {
    let dimensions = this.getLightboxDimensions(imageWidth, imageHeight);
    let dialogRef = this.dialog.open(LightboxDialogComponent, {
      width: dimensions[0].toString() + 'px',
    });
    dialogRef.componentInstance.imageUrl = imageUrl;
    dialogRef.componentInstance.imageWidth = imageWidth;
    dialogRef.componentInstance.imageHeight = imageHeight;
  }

  public showManageUsersDialog(org: Organization): Observable<any> {
    let dialogConfig = this.getConfiguration();
    dialogConfig['width'] = '1000px';
    let dialogRef = this.dialog.open(ManageUsersDialogComponent, dialogConfig);
    dialogRef.componentInstance.organization = org;
    this.dialogRefs.push(dialogRef);
    return dialogRef.afterClosed();
  }

  public showPaymentMethodsDialog(): Observable<any> {
    let dialogConfig = this.getConfiguration();
    dialogConfig['width'] = '500px';
    let dialogRef = this.dialog.open(PaymentMethodDialogComponent, dialogConfig);
    this.dialogRefs.push(dialogRef);
    return dialogRef.afterClosed();
  }

  public showStrongConfirmDialog(title: string, description: string, confirmString: string, size: string = 'medium'): Observable<boolean> {
    let dialogConfig = this.getConfigurationForSize(size);
    let dialogRef = this.dialog.open(StrongConfirmDialogComponent, dialogConfig);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.description = description;
    dialogRef.componentInstance.confirmString = confirmString;
    this.dialogRefs.push(dialogRef);
    return dialogRef.afterClosed();
  }

  public showUploadDialog(title: string, description: string, uploadEndpoint: string, fileDescription: string, sampleFiles: string[] = []): Observable<any> {
    let dialogConfig = this.getConfiguration();
    let dialogRef = this.dialog.open(UploadDialogComponent, dialogConfig);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.description = description;
    dialogRef.componentInstance.uploadUrl = uploadEndpoint;
    dialogRef.componentInstance.fileDescription = fileDescription;
    dialogRef.componentInstance.sampleFiles = sampleFiles;
    this.dialogRefs.push(dialogRef);
    return dialogRef.afterClosed();
  }

  public showUploadDomainsDialog(organization: Organization, notifyOnSuccess: boolean = true): Observable<DomainsUploadResponse> {
    return this.showUploadDialog(
      'Upload Domain Names File',
      'Please select a file that contains the domain names (one per line) that you would like to upload to your organization ' + organization.name + '.',
      this.orgService.getDomainsUploadUrl(organization.uuid),
      'domain names list',
      ['/assets/examples/domains_example_1.txt'],
    ).map(response => {
      let toReturn = JSON.parse(response) as DomainsUploadResponse;
      if (notifyOnSuccess) {
        if (toReturn.batch_required) {
          this.notifyService.success('Success', 'Your file was uploaded successfully. Due to its size, it may take a few minutes to process and update your records accordingly. Please check back in a few minutes.');
        } else {
          this.notifyService.success('Success', 'Domain names list uploaded successfully. A total of ' + toReturn.new_domains.toString() + ' new domains were added, ' + toReturn.errored.toString() + ' domains were invalid, and ' + toReturn.skipped.toString() + ' domains were skipped as they already existed for that organization.');
        }
      }
      return toReturn;
    })
  }

  public showUploadNetworksDialog(organization: Organization, notifyOnSuccess: boolean = true): Observable<NetworksUploadResponse> {
    return this.showUploadDialog(
      'Upload Networks File',
      'Please select a file that contains descriptions of the networks that you would like to upload to your organization ' + organization.name + '.',
      this.orgService.getNetworksUploadUrl(organization.uuid),
      'network CSV',
      ['/assets/examples/networks_example_1.csv'],
    ).map(response => {
      let toReturn = JSON.parse(response) as NetworksUploadResponse;
      if (notifyOnSuccess) {
        this.notifyService.success(
          'Success',
          'Networks file uploaded successfully. ' + toReturn.new_networks.toString() + ' new networks were created, ' + toReturn.skipped.toString() + ' networks were skipped, ' + toReturn.blacklisted + ' networks were not permitted (blacklisted), and ' + toReturn.errored + ' entries in the uploaded file were invalid.'
        );
      }
      return toReturn;
    });
  }

}
