/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WebServicePortsDonutComponent } from './web-service-ports-donut.component';

describe('WebServicePortsDonutComponent', () => {
  let component: WebServicePortsDonutComponent;
  let fixture: ComponentFixture<WebServicePortsDonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebServicePortsDonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebServicePortsDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
