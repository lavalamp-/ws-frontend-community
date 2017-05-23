/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsPresentationService } from './ws-presentation.service';

describe('WsPresentationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsPresentationService]
    });
  });

  it('should ...', inject([WsPresentationService], (service: WsPresentationService) => {
    expect(service).toBeTruthy();
  }));
});
