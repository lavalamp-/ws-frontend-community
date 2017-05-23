/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StripeTokenFormComponent } from './stripe-token-form.component';

describe('StripeTokenFormComponent', () => {
  let component: StripeTokenFormComponent;
  let fixture: ComponentFixture<StripeTokenFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeTokenFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeTokenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
