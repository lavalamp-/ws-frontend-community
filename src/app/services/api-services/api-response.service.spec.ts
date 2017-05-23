/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiResponseService } from './api-response.service';

describe('ApiResponseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiResponseService]
    });
  });

  it('should ...', inject([ApiResponseService], (service: ApiResponseService) => {
    expect(service).toBeTruthy();
  }));
});
