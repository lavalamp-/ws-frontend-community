/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrgSelectGuardService } from './org-select-guard.service';

describe('FUCKYOU', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrgSelectGuardService]
    });
  });

  it('should ...', inject([OrgSelectGuardService], (service: OrgSelectGuardService) => {
    expect(service).toBeTruthy();
  }));
});
