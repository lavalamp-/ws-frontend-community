/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsTitleService } from './ws-title.service';

describe('WsTitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsTitleService]
    });
  });

  it('should ...', inject([WsTitleService], (service: WsTitleService) => {
    expect(service).toBeTruthy();
  }));
});
