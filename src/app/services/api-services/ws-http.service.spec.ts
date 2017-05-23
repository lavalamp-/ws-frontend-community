/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsHttpService } from './ws-http.service';

describe('WsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsHttpService]
    });
  });

  it('should ...', inject([WsHttpService], (service: WsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
