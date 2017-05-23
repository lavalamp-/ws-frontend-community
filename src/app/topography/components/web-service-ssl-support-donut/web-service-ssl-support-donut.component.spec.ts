/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WebServiceSslSupportDonutComponent } from './web-service-ssl-support-donut.component';

describe('WebServiceSslSupportDonutComponent', () => {
  let component: WebServiceSslSupportDonutComponent;
  let fixture: ComponentFixture<WebServiceSslSupportDonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebServiceSslSupportDonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebServiceSslSupportDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
