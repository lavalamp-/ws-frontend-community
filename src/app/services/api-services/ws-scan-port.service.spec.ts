/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsScanPortService } from './ws-scan-port.service';

describe('WsScanPortService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsScanPortService]
    });
  });

  it('should ...', inject([WsScanPortService], (service: WsScanPortService) => {
    expect(service).toBeTruthy();
  }));
});
