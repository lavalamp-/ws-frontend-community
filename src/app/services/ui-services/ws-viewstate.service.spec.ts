/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsViewstateService } from './ws-viewstate.service';

describe('WsViewstateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsViewstateService]
    });
  });

  it('should ...', inject([WsViewstateService], (service: WsViewstateService) => {
    expect(service).toBeTruthy();
  }));
});
