import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Routes, RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';
import { WidgetCalendarComponent } from './widget-calendar/widget-calendar.component';
import { ViewCalendarsMenuComponent } from './header/view-calendars-menu/view-calendars-menu.component';
import { DayCalendarComponent } from './day-calendar/day-calendar.component';
import { WeekCalendarComponent } from './week-calendar/week-calendar.component';
import { NavigatorComponent } from './header/navigator/navigator.component';


const routes: Routes = [
  { path: '', redirectTo: 'month', pathMatch: 'full' },
  { path: 'month', component: MonthCalendarComponent },
  { path: 'day', component: DayCalendarComponent },
  { path: 'week', component: WeekCalendarComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MonthCalendarComponent,
    WidgetCalendarComponent,
    ViewCalendarsMenuComponent,
    DayCalendarComponent,
    WeekCalendarComponent,
    NavigatorComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
