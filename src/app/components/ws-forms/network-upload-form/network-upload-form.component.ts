import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { FileItem } from 'ng2-file-upload/file-upload/file-item.class'
import {AuthService} from "../../../services/api-services/auth.service";
import {ApiErrorService} from "../../../services/api-services/api-error.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'ws-network-upload-form',
  templateUrl: './network-upload-form.component.html',
  styleUrls: ['./network-upload-form.component.css']
})
export class NetworkUploadFormComponent implements OnInit {

  public uploader:FileUploader;
  @Output() networkUploadFormChange = new EventEmitter;
  private networkUploadForm: FormGroup;
  @Input() orgUuid: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiErrorService: ApiErrorService
  ) { }

  ngOnInit() {
    this.networkUploadForm = this.formBuilder.group({
      file: ['', Validators.required],
    });
    this.uploader = new FileUploader({
      url: 'http://localhost:8000/organizations/'+this.orgUuid+'/networks/upload-range/',
      headers: [
        {name:'Authorization', value:'Token '+this.authService.authToken},
      ],
      method: 'post'
    });
    this.uploader.onSuccessItem = () => {
      this.networkUploadFormChange.emit(this.networkUploadForm);
      this.networkUploadForm.reset();
    };
    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      let jsonResponse = JSON.parse(response);
      let firstErrorMessage = this.apiErrorService.getFirstError(jsonResponse).error_message;
      this.networkUploadForm.reset();
      this.networkUploadFormChange.emit(this.networkUploadForm);
    }
  }

  onClickUpload() {
    this.uploader.uploadAll();
  }

}
