/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsDomainNameReportService } from './ws-domain-name-report.service';

describe('WsDomainNameReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsDomainNameReportService]
    });
  });

  it('should ...', inject([WsDomainNameReportService], (service: WsDomainNameReportService) => {
    expect(service).toBeTruthy();
  }));
});
