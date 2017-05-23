/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsChartService } from './ws-chart.service';

describe('WsChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsChartService]
    });
  });

  it('should ...', inject([WsChartService], (service: WsChartService) => {
    expect(service).toBeTruthy();
  }));
});
