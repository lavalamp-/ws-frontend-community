/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WebApplicationFiltersTabsComponent } from './web-application-filters-tabs.component';

describe('WebApplicationFiltersTabsComponent', () => {
  let component: WebApplicationFiltersTabsComponent;
  let fixture: ComponentFixture<WebApplicationFiltersTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebApplicationFiltersTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebApplicationFiltersTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
