import { Component, OnInit, ViewChildren, Output, EventEmitter, QueryList, HostListener, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { UtilsService } from '../utils.service';


const END_HEIGHT_DATE_WRAPPER = 2000
const DATE_CELL_HEIGHT = 60
const START_HEIGHT_DATE_WRAPPER = 10

@Component({
  selector: 'app-day-calendar',
  templateUrl: './day-calendar.component.html',
  styleUrls: ['./day-calendar.component.scss']
})
export class DayCalendarComponent {
  @ViewChild('datesWrapper') datesWrapper!: ElementRef

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
  offsetTop = 0
  currDragEl!: any
  prevZindexDragEl!: number
  mouseDown = false
  subscrMouseMove!: any
  subscrMouseUp!: any
  eventInfo!: any
  mousemoving = false


  constructor(private utilService: UtilsService,
    private calendarService: CalendarService,
    private renderer: Renderer2) {
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
    if (this.allCalendars.length == 0) {
      return
    }

    this.add24HoursFormat()
    this.parseDurationEvent()
    this.addDayOfWeek()
    this.setEvents()
    for(let e of this.allCalendars){
      this.formatPretty(e)
    }
  }

  addDayOfWeek() {
    for (let event of this.allCalendars) {
      event.dayOfWeek = this.currDay.toLocaleString('en-us', { weekday: 'long' })
      event.month = this.currDay.toLocaleString('default', { month: 'long' })
    }
  }

  parseDurationEvent() {
    for (let event of this.allCalendars) {
      let minutes = (event.format24End - event.format24Start) * DATE_CELL_HEIGHT
      minutes -= event.startParse.min
      minutes += event.endParse.min
      event.duration = minutes
    }
  }

  add24HoursFormat() {
    for (let event of this.allCalendars) {
      event.format24Start = event.startParse.format == 'PM' ? event.startParse.hour + 12 : event.startParse.hour
      event.format24End = event.endParse.format == 'PM' ? event.endParse.hour + 12 : event.endParse.hour
    }
  }

  onMouseDown(e: any) {
    this.mousemoving = false
    this.subscrMouseMove = this.renderer.listen(this.datesWrapper.nativeElement, 'mousemove', this.onMouseMove.bind(this))
    this.subscrMouseUp = this.renderer.listen('document', 'mouseup', this.onMouseUp.bind(this))
    this.currDragEl = e.target;


    this.offsetTop = this.currDragEl.offsetTop - e.clientY
  }

  onMouseMove(e: any) {
    e.preventDefault()
    if (!this.mousemoving) {
      this.currDragEl.classList.add('draging')
      this.currDragEl.style.boxShadow = `0px 2px 11px 0px ${this.currDragEl.style.background}`
    }
    this.mousemoving = true
    let calcCord = e.clientY + this.offsetTop
    calcCord = this.range(START_HEIGHT_DATE_WRAPPER, END_HEIGHT_DATE_WRAPPER, calcCord)
    this.currDragEl.style.top = (calcCord) + 'px'
    this.setParameterForEvent()
  }

  onMouseUp(e: any) {
    if (e.button != 0) {
      return
    }
    this.subscrMouseMove()
    this.subscrMouseUp()
    this.currDragEl.style.boxShadow = 'none'
    this.setEvents()
    this.currDragEl.classList.remove('draging')
  }

  range(start: number, end: number, value: number) {
    if (value < start) {
      value = start
    }
    if (value > end) {
      value = end
    }
    return value
  }

  setParameterForEvent() {
    let e = this.allCalendars[this.currDragEl.id]
    console.log(e.derutation);
    
    let hour = (parseInt((this.currDragEl.style.top) + 6) / DATE_CELL_HEIGHT) + 1
    e.format24Start = Math.floor(hour)
    let percentMin = hour - Math.floor(hour)
    let res = this.swithTimeFormat(Math.floor(hour))
    e.startParse.hour = res.digit
    e.startParse.format  = res.format
    let minutes: any = Math.trunc(Number(percentMin.toFixed(1)) * DATE_CELL_HEIGHT)
    e.startParse.min = this.rounding(minutes)

    //set end 
    let timeToAdd = this.getHoursFromMinutes(e.duration)
    e.format24End = e.format24Start + timeToAdd.hour
    e.endParse.min = timeToAdd.min + Number(e.startParse.min)
    if (e.endParse.min >= 60) {
      e.endParse.min -= 60
      e.format24End += 1
    }

    let { digit, format } = this.swithTimeFormat(e.format24End)
    e.endParse.hour = digit
    e.endParse.format  = format
    this.formatPretty(e)
  }

  formatPretty(e: any) {
    if (e.startParse.format  == e.endParse.format) {
      e.start = e.startParse.min == '00' ? e.startParse.hour : `${e.startParse.hour}:${e.startParse.min}`
      e.end = e.endParse.min == '00' ? `${e.endParse.hour}${e.endParse.format}` : `${e.endParse.hour}:${e.endParse.min} ${e.endParse.format }`
    } else {
      e.start = e.startParse.min == '00' ? `${e.startParse.hour} ${e.startParse.format }` : `${e.startParse.hour}:${e.startParse.min} ${e.startParse.format }`
      e.end = e.endParse.min == '00' ? `${e.endParse.hour} ${e.endParse.format }` : `${e.endParse.hour}:${e.endParse.min} ${e.endParse.format }`
    }

  }

  getHoursFromMinutes(minutes: number) {
    let hour = Math.floor(minutes / 60)
    let perCent = Number((minutes / 60).toFixed(2)) % 1
    let min = Math.round(perCent * 60)
    return { hour, min }
  }

  swithTimeFormat(digit: number): { digit: number, format: string } {
    let format = 'AM'
    if (digit > 12) {
      digit -= 12
      format = 'PM'
    }

    return { digit, format }
  }

  rounding(num: number): number | string {
    let res: any = 0

    if (num >= 0) {
      res = '00'
    }
    if (num > 15) {
      res = 15
    }
    if (num > 30) {
      res = 30
    }
    if (num > 45) {
      res = 45
    }
    return res
  }

  setEvents() {
    let groups = this.getGroups()
    let prevLeft = 0
    for (let group of groups) {
      group.sort((a: any, b: any) => b.duration - a.duration)
      for (let i = 0; i < group.length; i++) {
        let event = group[i]
        if (i == 0) {
          event.top = ((DATE_CELL_HEIGHT * event.format24Start) + Number(event.startParse.min))
          event.zIndex = i + 1
          event.left = 4 + '%'
          event.width = 97 + '%'
          continue
        }

        event.top = (DATE_CELL_HEIGHT * event.format24Start) + Number(event.startParse.min)
        event.zIndex = i + 1
        event.left = (prevLeft + 12) + '%'
        prevLeft = prevLeft + 12
        event.width = (97 - prevLeft) + '%'
      }
    }
  }

  getGroups() {
    let groups = []
    let group: any = []
    let durationGroup: any = {}
    this.allCalendars.sort((a: any, b: any) => a.format24Start - b.format24Start)

    for (let i = 0; i < this.allCalendars.length; i++) {
      let event = this.allCalendars[i]
      if (event.format24Start < durationGroup.end && i != 0) {
        group.push(event)
        if (event.format24End > durationGroup.end) {
          durationGroup.end = event.format24End
        }
      } else {
        group = []
        groups.push(group)
        durationGroup.start = event.format24Start
        durationGroup.end = event.format24End
        group.push(event)
      }
    }

    return groups
  }

  setDateView(d: Date) {
    this.currMonth = d.getMonth()
    this.currDay = d
    this.getAllCalendars()
  }

  isToday(date: Number) {
    let d = new Date()
    return date == d.getDate() &&
      this.currMonth == this.d.getMonth() &&
      this.currYear == this.d.getFullYear()
  }

  sendEventInfo(index: any) {
    setTimeout(() => {
      if (!this.mousemoving) {
        this.eventInfo = this.allCalendars[index]
        this.currDragEl.style.boxShadow = `0px 2px 11px 0px ${this.currDragEl.style.background}`
      }
    }, 100);
  }

  clearEventInfo() {
    this.eventInfo = null
    this.currDragEl.style.boxShadow = 'none'
    this.currDragEl = null
  }



}
