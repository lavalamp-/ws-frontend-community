/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsDialogService } from './ws-dialog.service';

describe('WsDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsDialogService]
    });
  });

  it('should ...', inject([WsDialogService], (service: WsDialogService) => {
    expect(service).toBeTruthy();
  }));
});
