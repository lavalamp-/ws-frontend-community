/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SslSupportSubjectOrgDonutComponent } from './ssl-support-subject-org-donut.component';

describe('SslSupportSubjectOrgDonutComponent', () => {
  let component: SslSupportSubjectOrgDonutComponent;
  let fixture: ComponentFixture<SslSupportSubjectOrgDonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SslSupportSubjectOrgDonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SslSupportSubjectOrgDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
