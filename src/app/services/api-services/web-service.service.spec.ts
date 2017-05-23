/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebServiceService } from './web-service.service';

describe('WebServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebServiceService]
    });
  });

  it('should ...', inject([WebServiceService], (service: WebServiceService) => {
    expect(service).toBeTruthy();
  }));
});
