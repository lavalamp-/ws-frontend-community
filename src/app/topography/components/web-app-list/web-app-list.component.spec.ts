/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WebAppListComponent } from './web-app-list.component';

describe('WebAppListComponent', () => {
  let component: WebAppListComponent;
  let fixture: ComponentFixture<WebAppListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebAppListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebAppListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
