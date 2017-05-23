import { Injectable } from '@angular/core';
import {Response} from "@angular/http";
import * as FileSaver from 'file-saver';

@Injectable()
export class DownloadHelperService {

  constructor() { }

  public downloadFileFromResponse(response: Response, fileName: string = null): void {
    let blob = response.blob();
    if (!fileName) {
      fileName = this.getFileNameFromResponse(response);
    }
    FileSaver.saveAs(blob, fileName);
  }

  private getFileNameFromResponse(response: Response): string {
    let headerContent = response.headers.get('Content-Disposition');
    return headerContent.split('=')[1];
  }

}
