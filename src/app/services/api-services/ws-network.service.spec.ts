/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsNetworkService } from './ws-network.service';

describe('WsNetworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsNetworkService]
    });
  });

  it('should ...', inject([WsNetworkService], (service: WsNetworkService) => {
    expect(service).toBeTruthy();
  }));
});
