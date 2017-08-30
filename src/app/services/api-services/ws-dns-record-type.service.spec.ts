/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsDnsRecordTypeService } from './ws-dns-record-type.service';

describe('WsDnsRecordTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsDnsRecordTypeService]
    });
  });

  it('should ...', inject([WsDnsRecordTypeService], (service: WsDnsRecordTypeService) => {
    expect(service).toBeTruthy();
  }));
});
