/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DomainNameCardComponent } from './domain-name-card.component';

describe('DomainNameCardComponent', () => {
  let component: DomainNameCardComponent;
  let fixture: ComponentFixture<DomainNameCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainNameCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainNameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
