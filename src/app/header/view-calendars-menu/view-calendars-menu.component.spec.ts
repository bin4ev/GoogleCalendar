import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCalendarsMenuComponent } from './view-calendars-menu.component';

describe('ViewCalendarsMenuComponent', () => {
  let component: ViewCalendarsMenuComponent;
  let fixture: ComponentFixture<ViewCalendarsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCalendarsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCalendarsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
