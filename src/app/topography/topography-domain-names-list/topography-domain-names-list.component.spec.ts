/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopographyDomainNamesListComponent } from './topography-domain-names-list.component';

describe('TopographyDomainNamesListComponent', () => {
  let component: TopographyDomainNamesListComponent;
  let fixture: ComponentFixture<TopographyDomainNamesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopographyDomainNamesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopographyDomainNamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
