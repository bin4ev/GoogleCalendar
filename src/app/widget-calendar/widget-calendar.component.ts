import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from '../utils.service';

const MS_IN_DAY = 100 * 60 * 60 * 24

@Component({
  selector: 'widget-calendar',
  templateUrl: './widget-calendar.component.html',
  styleUrls: ['./widget-calendar.component.css'],
})
export class WidgetCalendarComponent implements OnInit {
  @Output() sentCurrDate = new EventEmitter

  iconLeft = faCaretLeft
  iconRight = faCaretRight

  d = new Date()
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  today = this.d.getDate()
  currYear = this.d.getFullYear()
  currMonthIndex = this.d.getMonth()
  currMonth = this.months[this.currMonthIndex];
  StartMouth = this.months[this.currMonthIndex];
  firstDay = new Date(this.d.getFullYear(), this.d.getMonth(), 1);
  lastDayOfMonth = new Date(this.d.getFullYear(), this.d.getMonth() + 1, 0);
  firstDayWeek = this.weekdays[this.firstDay.getDay()]

  AllMoth: any = []
  dates: any = []
  selectedEl!: any
  daysForMonth!: number
  pressedNext!: boolean
  disable = true
  matchDate = true

  constructor( private utilService: UtilsService) {
    this.utilService.getCurrDate$.subscribe(d => this.setDateView(d))
  }

  ngOnInit(): void {
    this.daysForMonth = this.getdaysFromMouths(this.currMonthIndex)
    this.setViewDates(this.firstDay)
  }

  setDateView(d: Date) {
    this.currYear = d.getFullYear()
    this.currMonthIndex = d.getMonth()
    this.daysForMonth = this.getdaysFromMouths(this.currMonthIndex)
    this.currMonth = this.months[this.currMonthIndex];
    this.firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    this.setViewDates(this.firstDay)
  /*   this.sentCurrMonth.emit(`${this.currMonth} ${this.currYear}`) */
  }

  checkDateIsAfter(date: number): boolean {
    let now = new Date()
    return this.currYear < this.d.getFullYear() ||
      this.currMonthIndex < this.d.getMonth() ||
      this.currMonthIndex == this.d.getMonth() &&
      date <= now.getDate()
  }

  onSelect(e: any) {
    if (this.selectedEl) {
      this.selectedEl.classList.remove('selected')
    }
    e.target.classList.add('selected')
    this.selectedEl = e.target
    let date = new Date(this.currYear, this.currMonthIndex,e.target.textContent)
    this.sentCurrDate.emit(date)
  }

  changeMonth() {
    this.pressedNext ? this.currMonthIndex++ : this.currMonthIndex--
    if (this.currMonthIndex < 0) {
      this.currMonthIndex = 11
      this.currYear--
    }
    if (this.currMonthIndex > 11) {
      this.currMonthIndex = 0
      this.currYear++
    }
    this.daysForMonth = this.getdaysFromMouths(this.currMonthIndex)
    this.currMonth = this.months[this.currMonthIndex % this.months.length]
    this.utilService.setCurrDate(new Date(this.currYear, this.currMonthIndex,1))

  }

  next() {
    if (this.selectedEl) {
      this.selectedEl.classList.remove('selected')
    }
    this.pressedNext = true
    this.changeMonth()
    this.setViewDates(this.firstDay)
  }

  previous() {
    if (this.selectedEl) {
      this.selectedEl.classList.remove('selected')
    }
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

  isDateBefore(date:Number) {
    let d = new Date
    return date < d.getDate() &&
      this.currMonth == this.months[this.d.getMonth()] &&
      this.currYear == this.d.getFullYear()
  }

  getdaysFromMouths(month: any) {
    let daysFromMouths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return daysFromMouths[month]
  }
}
