/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SslSupportIssuerOrgDonutComponent } from './ssl-support-issuer-org-donut.component';

describe('SslSupportIssuerOrgDonutComponent', () => {
  let component: SslSupportIssuerOrgDonutComponent;
  let fixture: ComponentFixture<SslSupportIssuerOrgDonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SslSupportIssuerOrgDonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SslSupportIssuerOrgDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
