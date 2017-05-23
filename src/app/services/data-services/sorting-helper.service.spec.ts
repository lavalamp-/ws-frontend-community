/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SortingHelperService } from './sorting-helper.service';

describe('SortingHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortingHelperService]
    });
  });

  it('should ...', inject([SortingHelperService], (service: SortingHelperService) => {
    expect(service).toBeTruthy();
  }));
});
