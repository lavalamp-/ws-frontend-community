/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SslSupportCidrDonutComponent } from './ssl-support-cidr-donut.component';

describe('SslSupportCidrDonutComponent', () => {
  let component: SslSupportCidrDonutComponent;
  let fixture: ComponentFixture<SslSupportCidrDonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SslSupportCidrDonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SslSupportCidrDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
