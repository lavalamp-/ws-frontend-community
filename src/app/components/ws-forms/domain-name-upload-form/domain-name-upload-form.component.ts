import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { FileItem } from 'ng2-file-upload/file-upload/file-item.class'
import {AuthService} from "../../../services/api-services/auth.service";
import {ApiErrorService} from "../../../services/api-services/api-error.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'ws-domain-name-upload-form',
  templateUrl: './domain-name-upload-form.component.html',
  styleUrls: ['./domain-name-upload-form.component.css']
})
export class DomainNameUploadFormComponent implements OnInit {

  public uploader:FileUploader;
  @Output() domainNameUploadFormChange = new EventEmitter;
  private domainNameUploadForm: FormGroup;
  @Input() orgUuid: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiErrorService: ApiErrorService
  ) { }

  ngOnInit() {
    this.domainNameUploadForm = this.formBuilder.group({
      file: ['', Validators.required],
    });
    this.uploader = new FileUploader({
      url: 'http://localhost:8000/organizations/'+this.orgUuid+'/domain-names/upload-range/',
      headers: [
        {name:'Authorization', value:'Token '+this.authService.authToken},
      ],
      method: 'post'
    });
    this.uploader.onSuccessItem = () => {
      this.domainNameUploadFormChange.emit(this.domainNameUploadForm);
      this.domainNameUploadForm.reset();
    };
    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      let jsonResponse = JSON.parse(response);
      let firstErrorMessage = this.apiErrorService.getFirstError(jsonResponse).error_message;
      this.domainNameUploadForm.reset();
      this.domainNameUploadFormChange.emit(this.domainNameUploadForm);
    }
  }

  onClickUpload() {
    this.uploader.uploadAll();
  }

}
