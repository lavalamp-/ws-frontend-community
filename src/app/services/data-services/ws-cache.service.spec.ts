/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsCacheService } from './ws-cache.service';

describe('WsCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsCacheService]
    });
  });

  it('should ...', inject([WsCacheService], (service: WsCacheService) => {
    expect(service).toBeTruthy();
  }));
});
