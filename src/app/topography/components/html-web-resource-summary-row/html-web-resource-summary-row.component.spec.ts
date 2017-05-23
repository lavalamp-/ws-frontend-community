/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HtmlWebResourceSummaryRowComponent } from './html-web-resource-summary-row.component';

describe('HtmlWebResourceSummaryRowComponent', () => {
  let component: HtmlWebResourceSummaryRowComponent;
  let fixture: ComponentFixture<HtmlWebResourceSummaryRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlWebResourceSummaryRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlWebResourceSummaryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
