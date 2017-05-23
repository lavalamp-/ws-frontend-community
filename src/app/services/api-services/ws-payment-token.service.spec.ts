/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsPaymentTokenService } from './ws-payment-token.service';

describe('WsPaymentTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsPaymentTokenService]
    });
  });

  it('should ...', inject([WsPaymentTokenService], (service: WsPaymentTokenService) => {
    expect(service).toBeTruthy();
  }));
});
