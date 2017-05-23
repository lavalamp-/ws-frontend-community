/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsStringHelperService } from './ws-string-helper.service';

describe('WsStringHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsStringHelperService]
    });
  });

  it('should ...', inject([WsStringHelperService], (service: WsStringHelperService) => {
    expect(service).toBeTruthy();
  }));
});
