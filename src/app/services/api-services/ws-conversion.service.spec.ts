/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsConversionService } from './ws-conversion.service';

describe('WsConversionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsConversionService]
    });
  });

  it('should ...', inject([WsConversionService], (service: WsConversionService) => {
    expect(service).toBeTruthy();
  }));
});
