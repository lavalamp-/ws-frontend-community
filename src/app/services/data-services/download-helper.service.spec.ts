/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DownloadHelperService } from './download-helper.service';

describe('DownloadHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DownloadHelperService]
    });
  });

  it('should ...', inject([DownloadHelperService], (service: DownloadHelperService) => {
    expect(service).toBeTruthy();
  }));
});
