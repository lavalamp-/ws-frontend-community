/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsNetworkServiceService } from './ws-network-service.service';

describe('WsNetworkServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsNetworkServiceService]
    });
  });

  it('should ...', inject([WsNetworkServiceService], (service: WsNetworkServiceService) => {
    expect(service).toBeTruthy();
  }));
});
