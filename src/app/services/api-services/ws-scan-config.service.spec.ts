/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsScanConfigService } from './ws-scan-config.service';

describe('WsScanConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsScanConfigService]
    });
  });

  it('should ...', inject([WsScanConfigService], (service: WsScanConfigService) => {
    expect(service).toBeTruthy();
  }));
});
