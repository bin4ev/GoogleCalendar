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
import { ToolTipDirective } from './tool-tip.directive';
import { EvenInfotDialogComponent } from './even-infot-dialog/even-infot-dialog.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { CreateEventComponent } from './create-event/create-event.component';


const routes: Routes = [
  { path: '', redirectTo: 'month', pathMatch: 'full' },
  { path: 'month', component: MonthCalendarComponent },
  { path: 'day', component: DayCalendarComponent},
  { path: 'day/event', component: EvenInfotDialogComponent },
  { path: 'week', component: WeekCalendarComponent },
  /*   {path: 'event', component: EvenInfotDialogComponent}, */
  { path: '**', component: MonthCalendarComponent }
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
    NavigatorComponent,
    ToolTipDirective,
    EvenInfotDialogComponent,
    UserInfoComponent,
    CreateEventComponent
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
