import {Component, OnInit, OnDestroy} from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {FileUploader} from "ng2-file-upload";
import {AuthService} from "../../../services/api-services/auth.service";
import {Subscription} from "rxjs";
import {ErrorApiResponse} from "../../../services/api-services/models/responses/error-api-response.interface";
import {Response} from "@angular/http";
import {WsHttpService} from "../../../services/api-services/ws-http.service";

@Component({
  selector: 'ws-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.sass']
})
export class UploadDialogComponent implements OnInit, OnDestroy {

  private fileOver: boolean = false;
  private uploader: FileUploader;
  private subscriptions: Subscription[];
  private error: ErrorApiResponse;
  private requestOutstanding: boolean = false;
  public title: string;
  public description: string;
  public uploadUrl: string;
  public sampleFiles: string[];
  public fileDescription: string;

  constructor(
    public dialogRef: MdDialogRef<UploadDialogComponent>,
    private authService: AuthService,
    private wsHttp: WsHttpService,
  ) { }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscriptions = [];
    this.uploader = new FileUploader({
      url: this.uploadUrl,
      authToken: 'Token ' + this.authService.authToken
    });
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => this.onErrorItem(item, response, status, headers);
    this.uploader.onBeforeUploadItem = (item: any) => this.onBeforeUploadItem(item);
  }

  private onBeforeUploadItem(item: any): void {
    this.wsHttp.incrementOutstandingCount();
    this.requestOutstanding = true;
  }

  private onErrorItem(item: any, response: any, status: any, headers: any): void {
    this.error = JSON.parse(response) as ErrorApiResponse;
    console.log(this.error);
    this.wsHttp.decrementOutstandingCount();
    this.requestOutstanding = false;
  }

  private onFileOver(overEvent: any): void {
    this.fileOver = overEvent;
  }

  private onPickNewFileClicked(): void {
    this.uploader.clearQueue();
    this.error = null;
  }

  private onSuccessItem(item: any, response: any, status: any, headers: any): void {
    this.wsHttp.decrementOutstandingCount();
    this.requestOutstanding = false;
    this.dialogRef.close(response);
  }

  private onUploadClicked(): void {
    this.uploader.uploadAll();
  }

  get backButtonEnabled(): boolean {
    return this.uploader.queue.length > 0 && !this.requestOutstanding;
  }

  get errorMessage(): string {
    return this.error['error_fields'][0]['message'];
  }

  get uploadButtonEnabled(): boolean {
    return this.backButtonEnabled && this.error == null;
  }

}
