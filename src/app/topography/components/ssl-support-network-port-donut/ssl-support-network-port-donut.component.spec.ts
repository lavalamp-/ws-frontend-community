/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SslSupportNetworkPortDonutComponent } from './ssl-support-network-port-donut.component';

describe('SslSupportNetworkPortDonutComponent', () => {
  let component: SslSupportNetworkPortDonutComponent;
  let fixture: ComponentFixture<SslSupportNetworkPortDonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SslSupportNetworkPortDonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SslSupportNetworkPortDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
