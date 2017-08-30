/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DnsRecordTypeFormComponent } from './dns-record-type-form.component';

describe('DnsRecordTypeFormComponent', () => {
  let component: DnsRecordTypeFormComponent;
  let fixture: ComponentFixture<DnsRecordTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnsRecordTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnsRecordTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
