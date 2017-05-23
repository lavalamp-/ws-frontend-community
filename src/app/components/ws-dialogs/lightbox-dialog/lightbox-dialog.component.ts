import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'ws-lightbox-dialog',
  templateUrl: './lightbox-dialog.component.html',
  styleUrls: ['./lightbox-dialog.component.sass']
})
export class LightboxDialogComponent implements OnInit {

  public imageUrl: string;
  public imageWidth: number;
  public imageHeight: number;

  constructor(
    public dialogRef: MdDialogRef<LightboxDialogComponent>
  ) { }

  ngOnInit() {
  }

  private getPlaceholderUrl(): string {
    return 'https://placeholdit.imgix.net/~text?txtsize=85&txt=' + this.imageWidth + '%C3%97' + this.imageHeight + '&w=' + this.imageWidth + '&h=' + this.imageHeight;
  }

}
