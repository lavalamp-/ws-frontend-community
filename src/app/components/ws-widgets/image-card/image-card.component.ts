import {Component, OnInit, Input, OnChanges, Inject, Output, EventEmitter} from '@angular/core';
import {MdDialog} from "@angular/material";
import {WsDialogService} from "../../ws-dialogs/ws-dialog.service";

@Component({
  selector: 'ws-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.sass']
})
export class ImageCardComponent implements OnInit, OnChanges {

  @Input() imageUrl: string;
  @Input() imageWidth: number = 1024;
  @Input() imageHeight: number = 768;
  @Input() showButton: boolean = true;
  @Input() buttonTooltip: string = 'View';
  @Output() buttonClicked = new EventEmitter;
  private currentImageUrl: string;

  constructor(
    private dialog: MdDialog,
    private dialogService: WsDialogService,
  ) { }

  ngOnChanges() {
    if (this.imageUrl) {
      this.currentImageUrl = this.imageUrl;
    } else {
      this.currentImageUrl = this.getPlaceholderUrl();
    }
  }

  ngOnInit() {
  }

  private getPlaceholderUrl(): string {
    return 'https://placeholdit.imgix.net/~text?txtsize=85&txt=' + this.imageWidth + '%C3%97' + this.imageHeight + '&w=' + this.imageWidth + '&h=' + this.imageHeight;
  }

  private onImageClicked(): void {
    this.dialogService.showLightboxDialog(this.imageWidth, this.imageHeight, this.currentImageUrl);
  }

  private onImageError(): void {
    this.currentImageUrl = this.getPlaceholderUrl();
  }

  private onViewClicked(): void {
    this.buttonClicked.emit();
  }

}
