/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopographySslSupportListComponent } from './topography-ssl-support-list.component';

describe('TopographySslSupportListComponent', () => {
  let component: TopographySslSupportListComponent;
  let fixture: ComponentFixture<TopographySslSupportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopographySslSupportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopographySslSupportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
