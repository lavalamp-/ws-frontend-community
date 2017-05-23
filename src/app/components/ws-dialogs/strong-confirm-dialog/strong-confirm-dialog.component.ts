import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'ws-strong-confirm-dialog',
  templateUrl: './strong-confirm-dialog.component.html',
  styleUrls: ['./strong-confirm-dialog.component.css']
})
export class StrongConfirmDialogComponent implements OnInit {

  public confirmContents: string;
  public title: string;
  public description: string;
  public confirmString: string;

  constructor(
    public dialogRef: MdDialogRef<StrongConfirmDialogComponent>
  ) { }

  ngOnInit() {
  }

  private onConfirmClicked(): void {
    this.dialogRef.close(true);
  }

  private onConfirmKeyDown(keyEvent: any): void {
    if (keyEvent.keyCode == 13 && this.submitEnabled) {
      // Currently this also fires on the button that opened the modal, thereby bringing the modal back up after hitting the enter key.
      // this.onConfirmClicked();
    }
  }

  get submitEnabled(): boolean {
    if (this.confirmContents == null) {
      return false;
    } else {
      return this.confirmContents == this.confirmString;
    }
  }

}
