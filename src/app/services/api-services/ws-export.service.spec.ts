/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsExportService } from './ws-export.service';

describe('WsExportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsExportService]
    });
  });

  it('should ...', inject([WsExportService], (service: WsExportService) => {
    expect(service).toBeTruthy();
  }));
});
