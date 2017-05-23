/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WebApplicationResponseCodeDonutComponent } from './web-application-response-code-donut.component';

describe('WebApplicationResponseCodeDonutComponent', () => {
  let component: WebApplicationResponseCodeDonutComponent;
  let fixture: ComponentFixture<WebApplicationResponseCodeDonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebApplicationResponseCodeDonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebApplicationResponseCodeDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
