/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WsBreadcrumbsService } from './ws-breadcrumbs.service';

describe('WsBreadcrumbsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsBreadcrumbsService]
    });
  });

  it('should ...', inject([WsBreadcrumbsService], (service: WsBreadcrumbsService) => {
    expect(service).toBeTruthy();
  }));
});
