/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QueryHelperService } from './query-helper.service';

describe('QueryHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryHelperService]
    });
  });

  it('should ...', inject([QueryHelperService], (service: QueryHelperService) => {
    expect(service).toBeTruthy();
  }));
});
