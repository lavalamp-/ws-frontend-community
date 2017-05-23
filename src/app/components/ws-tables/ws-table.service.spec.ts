/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsTableService } from './ws-table.service';

describe('WsTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsTableService]
    });
  });

  it('should ...', inject([WsTableService], (service: WsTableService) => {
    expect(service).toBeTruthy();
  }));
});
