/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SslSupportCardComponent } from './ssl-support-card.component';

describe('SslSupportCardComponent', () => {
  let component: SslSupportCardComponent;
  let fixture: ComponentFixture<SslSupportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SslSupportCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SslSupportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
