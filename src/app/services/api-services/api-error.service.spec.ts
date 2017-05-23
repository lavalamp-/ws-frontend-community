/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiErrorService } from './api-error.service';

describe('ApiErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiErrorService]
    });
  });

  it('should ...', inject([ApiErrorService], (service: ApiErrorService) => {
    expect(service).toBeTruthy();
  }));
});
