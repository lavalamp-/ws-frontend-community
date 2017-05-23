/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsLabelsService } from './ws-labels.service';

describe('WsLabelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsLabelsService]
    });
  });

  it('should ...', inject([WsLabelsService], (service: WsLabelsService) => {
    expect(service).toBeTruthy();
  }));
});
