import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAnalyzePage } from './dashboard-analyze.page';

describe('DashboardAnalyzePage', () => {
  let component: DashboardAnalyzePage;
  let fixture: ComponentFixture<DashboardAnalyzePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAnalyzePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAnalyzePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
