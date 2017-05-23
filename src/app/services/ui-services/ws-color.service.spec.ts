/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsColorService } from './ws-color.service';

describe('WsColorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsColorService]
    });
  });

  it('should ...', inject([WsColorService], (service: WsColorService) => {
    expect(service).toBeTruthy();
  }));
});
