/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetailListService } from './detail-list.service';

describe('DetailListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailListService]
    });
  });

  it('should ...', inject([DetailListService], (service: DetailListService) => {
    expect(service).toBeTruthy();
  }));
});
