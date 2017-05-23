/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsCaseService } from './ws-case.service';

describe('WsCaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsCaseService]
    });
  });

  it('should ...', inject([WsCaseService], (service: WsCaseService) => {
    expect(service).toBeTruthy();
  }));
});
