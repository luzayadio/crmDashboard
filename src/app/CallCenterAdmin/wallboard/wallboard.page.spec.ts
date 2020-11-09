import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallboardPage } from './wallboard.page';

describe('WallboardPage', () => {
  let component: WallboardPage;
  let fixture: ComponentFixture<WallboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
