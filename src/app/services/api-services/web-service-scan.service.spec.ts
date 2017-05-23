/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebServiceScanService } from './web-service-scan.service';

describe('WebServiceScanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebServiceScanService]
    });
  });

  it('should ...', inject([WebServiceScanService], (service: WebServiceScanService) => {
    expect(service).toBeTruthy();
  }));
});
