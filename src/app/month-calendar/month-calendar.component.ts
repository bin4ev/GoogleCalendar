import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { Event } from '../events';
import { CalendarService } from '../calendar.service'
import { UtilsService } from '../utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthCalendarComponent implements OnDestroy {
  @Output() sentCurrDate = new EventEmitter()
  @Output() sentCurrMonth = new EventEmitter()

  iconLeft = faCaretLeft
  iconRight = faCaretRight

  d = new Date()
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  today = this.d.getDate()
  currYear = this.d.getFullYear()
  currMonthIndex = this.d.getMonth()
  currMonth = this.months[this.currMonthIndex];
  StartMouth = this.months[this.currMonthIndex];
  firstDay = new Date(this.d.getFullYear(), this.d.getMonth(), 1);
  lastDayOfMonth = new Date(this.d.getFullYear(), this.d.getMonth() + 1, 0);
  firstDayWeek = this.weekdays[this.firstDay.getDay()]

  subscribtion!: Subscription
  AllMoth: any = []
  dates: any = []
  selectedEl!: any
  daysForMonth!: number
  pressedNext!: boolean
  disable = true
  matchDate = true
  start!: string
  end!: string
  name!: string
  allCalendars: any
  showCalendarOf!: any

  constructor(private changeDetector : ChangeDetectorRef, private calendarService: CalendarService, private utilService: UtilsService) {

  }

  ngOnInit(){
    this.subscribtion = this.utilService.data$.subscribe(d => {
      this.showCalendarOf = d
      this.daysForMonth = this.getdaysFromMouths(this.currMonthIndex)
      this.allCalendars = this.calendarService.getEvents(this.showCalendarOf, this.currMonthIndex + 1, 1, this.daysForMonth)
      this.changeDetector.detectChanges()     
    })
    this.utilService.getCurrDate$.subscribe(d =>{
      this.setDateView(d)
      this.changeDetector.detectChanges()})
  }

  trackByMethod(_:any, event: any) {
    return event.id
  }

  setDateView(d: Date) {
    this.currMonthIndex = d.getMonth()
    this.daysForMonth = this.getdaysFromMouths(this.currMonthIndex)
    this.currMonth = this.months[this.currMonthIndex];
    this.firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    this.allCalendars = this.calendarService.getEvents(this.showCalendarOf, this.currMonthIndex + 1, 1, this.daysForMonth)
    this.setViewDates(this.firstDay)
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
    this.allCalendars = this.calendarService.getEvents(this.showCalendarOf, this.currMonthIndex + 1, 1, this.daysForMonth)
  }

  next() {
    this.matchDate = false
    this.pressedNext = true
    this.changeMonth()
    this.setViewDates(this.firstDay)
  }

  previous() {
    if (this.currMonth == this.StartMouth) {
      this.matchDate = true
      return
    }

    this.matchDate = false
    this.pressedNext = false
    this.changeMonth()
    this.firstDay = new Date(this.currYear, this.currMonthIndex, 1);
    this.setViewDates(this.firstDay)
  }

  setViewDates(d: Date) {
    let start = d.getDay()
    let dates = []
    for (let i = start, j = 0; j < this.daysForMonth; i++, j++) {
      dates[i] = d.getDate()
      d.setDate(d.getDate() + 1)
    }
    this.dates = dates
  }

  checkEvents(objDate: any) {
    objDate.events = []
    for (let [key, value] of <Array<any>>Object.entries(this.allCalendars)) {
      if (key == 'Holidays') {
        this.checkForHolidays(objDate, key, value)
        continue
      }
      for (let e of value) {
        let [d, month] = e.date.split('/')
        if (Number(d) == objDate.date && Number(month) == this.currMonthIndex + 1) {
          objDate.events.push(e)
        }
      }
    }
  }

  checkForHolidays(objDate: any, key: string, value: any) {
    for (let day of value) {
      let [, , d] = day.date.split('-')
      if (Number(d) == objDate.date) {
        objDate.events.push({ owner: key, name: day.localName })
        console.log(objDate.events);

      }
    }
  }

  getLastSunday(year: any, month: any) {
    let d = new Date(year, month, 0);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }

  isToday(date: Number) {
    let d = new Date
    return date == d.getDate() &&
      this.currMonth == this.months[this.d.getMonth()] &&
      this.currYear == this.d.getFullYear()
  }

  isDateBefore(date: Number) {
    let d = new Date
    return date < d.getDate() &&
      this.currMonth == this.months[this.d.getMonth()] &&
      this.currYear == this.d.getFullYear()
  }

  getdaysFromMouths(month: any) {
    let daysFromMouths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return daysFromMouths[month]
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }
}
