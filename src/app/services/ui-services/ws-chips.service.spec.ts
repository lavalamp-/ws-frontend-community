/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsChipsService } from './ws-chips.service';

describe('WsChipsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsChipsService]
    });
  });

  it('should ...', inject([WsChipsService], (service: WsChipsService) => {
    expect(service).toBeTruthy();
  }));
});
