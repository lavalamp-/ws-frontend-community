/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsDomainNameService } from './ws-domain-name.service';

describe('WsDomainNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsDomainNameService]
    });
  });

  it('should ...', inject([WsDomainNameService], (service: WsDomainNameService) => {
    expect(service).toBeTruthy();
  }));
});
