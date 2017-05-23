/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WebApplicationContentTypesDonutComponent } from './web-application-content-types-donut.component';

describe('WebApplicationContentTypesDonutComponent', () => {
  let component: WebApplicationContentTypesDonutComponent;
  let fixture: ComponentFixture<WebApplicationContentTypesDonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebApplicationContentTypesDonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebApplicationContentTypesDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
