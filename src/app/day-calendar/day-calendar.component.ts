import { Component, OnInit, ViewChildren, Output, EventEmitter, QueryList } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-day-calendar',
  templateUrl: './day-calendar.component.html',
  styleUrls: ['./day-calendar.component.scss']
})
export class DayCalendarComponent {
  @ViewChildren('events') events!: QueryList<any>

  @Output() sentCurrDate = new EventEmitter

  d = new Date()
  weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  time = [
    { id: 0, time: '1AM' },
    { id: 2, time: '2AM' },
    { id: 3, time: '3AM' },
    { id: 4, time: '4AM' },
    { id: 5, time: '5AM' },
    { id: 6, time: '6AM' },
    { id: 7, time: '7AM' },
    { id: 8, time: '8AM' },
    { id: 9, time: '9AM' },
    { id: 10, time: '10AM' },
    { id: 11, time: '11AM' },
    { id: 12, time: '12PM' },
    { id: 13, time: '1PM' },
    { id: 14, time: '2PM' },
    { id: 15, time: '3PM' },
    { id: 16, time: '4PM' },
    { id: 17, time: '5PM' },
    { id: 18, time: '6PM' },
    { id: 19, time: '7PM' },
    { id: 20, time: '8PM', },
    { id: 21, time: '9PM' },
    { id: 22, time: '10PM' },
    { id: 23, time: '11PM' }]

  currYear = this.d.getFullYear()
  currMonth = this.d.getMonth()
  currDay = this.d
  showCalendarOf!: any
  allCalendars: any = []

  constructor(private utilService: UtilsService, private calendarService: CalendarService) {
    this.utilService.getCurrDate$.subscribe(d => {
      this.setDateView(d)
    })
    this.utilService.data$.subscribe(d => {
      this.showCalendarOf = d
      this.getAllCalendars()
    })
  }

  getAllCalendars() {
    this.allCalendars = this.calendarService.getEventsForToday(this.showCalendarOf, this.currDay)
    this.parseDurationEvent()
    this.setWithEvents()
  }

  parseDurationEvent() {
    for (let event of this.allCalendars) {
      let minutes = (parseInt(event.endParse.hour) - parseInt(event.startParse.hour)) * 60
      minutes += event.endParse.min - event.startParse.min
      event.duration = minutes
    }
  }

  setWithEvents() {
    for (let event of this.allCalendars) {
      let e = this.allCalendars.find((x: any) => event.end[0] > x.start[0])
      event.width = '67%'
      event.zIndex = 2
      e.width = '97%'
      e.zIndex = 1
    }
  }

  setDateView(d: Date) {
    this.currMonth = d.getMonth()
    this.currDay = d
    this.getAllCalendars()

  }

  isToday(date: Number) {
    let d = new Date
    return date == d.getDate() &&
      this.currMonth == this.d.getMonth() &&
      this.currYear == this.d.getFullYear()
  }


}
