/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsUserService } from './ws-user.service';

describe('WsUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsUserService]
    });
  });

  it('should ...', inject([WsUserService], (service: WsUserService) => {
    expect(service).toBeTruthy();
  }));
});
