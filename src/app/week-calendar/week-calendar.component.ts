import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { CalendarService } from '../calendar.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.scss']
})
export class WeekCalendarComponent {
  @ViewChildren('events') events!: QueryList<any>

  @Output() sentCurrDate = new EventEmitter

  iconLeft = faCaretLeft
  iconRight = faCaretRight

  d = new Date()
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  currMonthIndex = this.d.getMonth()
  currMonth = this.months[this.currMonthIndex];
  currDay = this.d
  currDayWeek = this.weekdays[this.d.getDay()]

  dates = new Array(this.weekdays.length).fill(0)
  selectedEl!: any
  daysForMonth!: number
  pressedNext!: boolean
  disable = true
  matchDate = true
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

  trackById(index: number, el: any) {
    return el.id
  }

  getAllCalendars(){
    this.allCalendars = this.calendarService.getEvents(this.showCalendarOf, this.currMonthIndex + 1, this.currDay.getDate(), this.currDay.getDate() + 7)
    for (let event of this.allCalendars) {
      this.parseDurationEvent(event)
    }
  }

  parseDurationEvent(event: any) {
    let minutes = (parseInt(event.endParse.hour) - parseInt(event.startParse.hour)) * 60
    minutes += event.endParse.min - event.startParse.min
    event.duration = minutes
  }

  setDateView(d: Date) {
    this.currYear = d.getFullYear()
    this.currMonthIndex = d.getMonth()
    this.currMonth = this.months[this.currMonthIndex];
    this.currDay = d
    this.daysForMonth = this.getdaysFromMouths(this.currMonthIndex)
    this.getAllCalendars()
    this.setViewDates(this.currDay)
  }

  checkDateIsAfter(date: number): boolean {
    let now = new Date()
    return this.currYear < this.d.getFullYear() ||
      this.currMonthIndex < this.d.getMonth() ||
      this.currMonthIndex == this.d.getMonth() &&
      date <= now.getDate()
  }

  onSelect(e: any) {
    if (this.checkDateIsAfter(e.target.textContent)) {
      return
    }

    if (this.selectedEl) {
      this.selectedEl.classList.remove('selected')
    }
    e.target.parentElement.classList.add('selected')
    this.selectedEl = e.target.parentElement
    this.sentCurrDate.emit(e.target.textContent)
  }

  changeMonth() {
    this.pressedNext ? this.currMonthIndex++ : this.currMonthIndex--
    if (this.currMonthIndex < 0) {
      this.currMonthIndex = 11
      this.currYear--
    }
    if (this.currMonthIndex > 11) {
      this.currYear++
    }
    this.daysForMonth = this.getdaysFromMouths(this.currMonthIndex)
    this.currMonth = this.months[this.currMonthIndex % this.months.length]
  }

  next() {
    this.matchDate = false
    this.pressedNext = true

    this.setViewDates(this.currDay)
  }

  previous() {
    if (this.matchDate) {
      return //do check
    }

    this.matchDate = false
    this.pressedNext = false
    this.currDay.setDate(this.currDay.getDate() - 14)
    this.setViewDates(this.currDay)
  }

  setSunday(d: Date) {
    let sunday = d.getDate() - d.getDay()
    return new Date(d.setDate(sunday))
  }

  setViewDates(d: Date) {
    d = this.setSunday(d)
    for (let i = 0; i < 7; i++) {
      this.dates[i] = {
        date: d.getDate(),
        id: i
      }
      if (this.currDay.getDate() == this.daysForMonth) {
        this.changeMonth()
      }
      d.setDate(d.getDate() + 1)
    }
  }

  isToday(date: Number) {
    let d = new Date
    return date == d.getDate() &&
      this.currMonth == this.months[this.d.getMonth()] &&
      this.currYear == this.d.getFullYear()
  }

  getdaysFromMouths(month: any) {
    let daysFromMouths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return daysFromMouths[month]
  }
}
