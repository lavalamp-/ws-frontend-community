/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsSslSupportService } from './ws-ssl-support.service';

describe('WsSslSupportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsSslSupportService]
    });
  });

  it('should ...', inject([WsSslSupportService], (service: WsSslSupportService) => {
    expect(service).toBeTruthy();
  }));
});
