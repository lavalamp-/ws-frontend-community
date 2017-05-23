/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsOrderService } from './ws-order.service';

describe('WsOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsOrderService]
    });
  });

  it('should ...', inject([WsOrderService], (service: WsOrderService) => {
    expect(service).toBeTruthy();
  }));
});
