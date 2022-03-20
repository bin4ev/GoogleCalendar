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
    { id: 12, time: '12AM' },
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
    this.setEvents()
  }

  parseDurationEvent() {
    for (let event of this.allCalendars) {
      let timeStart = event.startParse.format == 'PM' ? parseInt(event.startParse.hour) + 12 : parseInt(event.startParse.hour)
      let timeEnd = event.endParse.format == 'PM' ? parseInt(event.endParse.hour) + 12 : parseInt(event.endParse.hour)
      let minutes = (timeEnd - timeStart) * 60
      minutes += event.endParse.min - event.startParse.min
      event.duration = minutes
  }
}

setEvents() {
  this.allCalendars.sort((a: any, b: any) => b.duration - a.duration)
  for (let i = 1; i <= this.allCalendars.length; i++) {
    this.allCalendars[i].zIndex = i + 1
    this.allCalendars[i].left =  (i * 10) + '%'
    this.allCalendars[i].width = 100 - (i * 10) + '%'
  }

/*   for (let event of this.allCalendars) {
    for (let i = 0; i < this.allCalendars.length; i++) {
      let x = this.allCalendars[i]

      if (parseInt(x.start) > parseInt(event.start) &&
        parseInt(event.end) > parseInt(x.start)) {
        x.width = 100 - (i + 1 * 20) + '%'
        x.left = (i+1) * 2 + '%'
        continue
      }

      if (parseInt(x.start) < parseInt(event.start) &&
        parseInt(event.end) < parseInt(x.start)) {
        x.width = 100 - (i + 2 * 20) + '%'
        x.left = (i+1) * 4 + '%'
        continue
      }

      if (parseInt(x.start) < parseInt(event.start) &&
      parseInt(event.end) < parseInt(x.start)) {
       x.width = 100 - (i + 3* 20) + '%' 
      x.left = (i+1) * 6 + '%'
      continue
    }



      if (parseInt(x.start) < parseInt(event.start) &&
        parseInt(event.start) > parseInt(x.end)) {
        x.width = 100 - (i + 4 * 20) + '%'
        x.left = (i+1) * 7 + '%'
      }
    }
  } */
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
