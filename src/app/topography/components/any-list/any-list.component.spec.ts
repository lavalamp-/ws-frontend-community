/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnyListComponent } from './any-list.component';

describe('AnyListComponent', () => {
  let component: AnyListComponent;
  let fixture: ComponentFixture<AnyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
