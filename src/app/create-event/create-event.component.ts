import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faCalendarDay, faClockFour, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { pipe, skip, Subscription } from 'rxjs';
import { CalendarService } from '../calendar.service';
import { UtilsService } from '../utils.service';

const DATE_CELL_HEIGHT = 60

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, AfterViewInit {
  @ViewChild('input') inputEl!: ElementRef
  @Input() data!: any

  @Output() closeDialog = new EventEmitter()
  @Output() setEvent = new EventEmitter()
  @Output() setPos = new EventEmitter()

  times = [
    { time: '1:00 AM' },
    { time: '1:30 AM' },
    { time: '2:00 AM' },
    { time: '2:30 AM' },
    { time: '3:00 AM' },
    { time: '3:30 AM' },
    { time: '4:00 AM' },
    { time: '4:30 AM' },
    { time: '5:00 AM' },
    { time: '5:30 AM' },
    { time: '6:00 AM' },
    { time: '6:30 AM' },
    { time: '7:00 AM' },
    { time: '7:30 AM' },
    { time: '8:00 AM' },
    { time: '8:30 AM' },
    { time: '9:00 AM' },
    { time: '9:30 AM' },
    { time: '10:00 AM' },
    { time: '10:30 AM' },
    { time: '11:00 AM' },
    { time: '11:30 AM' },
    { time: '12:00 AM' },
    { time: '12:30 AM' },
    { time: '1:00 PM' },
    { time: '1:30 PM' },
    { time: '2:00 PM' },
    { time: '2:30 PM' },
    { time: '3:00 PM' },
    { time: '3:30 PM' },
    { time: '4:00 PM' },
    { time: '4:30 PM' },
    { time: '5:00 PM' },
    { time: '5:30 PM' },
    { time: '6:00 PM' },
    { time: '6:30 PM' },
    { time: '7:00 PM' },
    { time: '7:30 PM' },
    { time: '8:00 PM', },
    { time: '8:30 PM', },
    { time: '9:00 PM' },
    { time: '9:30 PM' },
    { time: '10:00 PM' },
    { time: '10:30 PM' },
    { time: '11:00 PM' },
    { time: '11:30 PM' },
    { time: '12:00 PM' },
    { time: '12:30 PM' }
  ]

  iconClock = faClockFour
  calendarIcon = faCalendarDay
  arrowDown = faSortDown

  subcr = new Subscription
  time: any = []
  startShowTime = this.times
  endShowTime: any = []
  currDate!: Date
  dayOfWeek!: any
  currMonth!: any
  event!: Event
  showTimeToChoose = false
  timeShowEl!: HTMLElement
  showCalendar = false
  bodyEl!: HTMLElement
  isOpenPicker = false

  constructor(
    private utilsService: UtilsService,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.setShowTimeToChoose()
    let sub = this.utilsService.getCurrDate$.subscribe(d => {
      this.currDate = d
      this.dayOfWeek = this.currDate.toLocaleString('en-us', { weekday: 'long' })
      this.currMonth = this.currDate.toLocaleString('default', { month: 'long' })
      this.data.date = `${d.getDate()}/${String(d.getMonth() + 1).padStart(2, '0')}`
    })
    this.subcr.add(sub)
    this.data.startParse = this.parseTime(this.data.start)
    this.data.endParse = this.parseTime(this.data.end)

  }

  ngAfterViewInit() {
    this.inputEl.nativeElement.focus()
  }

  setShowTimeToChoose() {
    let index = this.times.findIndex(x => x.time == this.data.start)
    this.endShowTime = this.times.slice(index + 1)
  }

  onBlur(e: any) {
    if (e.target.value) {
      this.data.name = e.target.value
    }
  }

  close() {
    this.closeDialog.emit()
  }

  showTimes(e: any) {
    if (e.target.className == 'start-time') {
      this.time = this.startShowTime
    } else {
      this.time = this.endShowTime
    }

    this.showTimeToChoose = false
    this.showCalendar = false
    if (!this.bodyEl) {
      this.bodyEl = e.target.closest('.body')
    }

    this.timeShowEl?.classList.remove('active-time-change')
    this.timeShowEl = e.target
    this.timeShowEl.classList.add('active-time-change')

    setTimeout(() => {
      this.showTimeToChoose = true
    }, 300);
    this.bodyEl.style.overflow = 'hidden'
  }

  closeTimes(e: any) {
    this.showTimeToChoose = false
    this.bodyEl.style.overflow = 'auto'
    this.timeShowEl.classList.remove('active-time-change')

    if (!this.timeShowEl.classList.contains('start-time')) {
      this.data.end = e.target.textContent
      this.data.endParse = this.parseTime(this.data.end)
    } else {
      this.data.start = e.target.textContent
      this.data.startParse = this.parseTime(this.data.start)
      let format = this.data.startParse.hour + 1 > 12 ? 'PM' : 'AM'
      let minEnd = String(this.data.startParse.min).padStart(2, '0')
      this.data.end = `${this.data.startParse.hour + 1}: ${minEnd} ${format}`
      this.data.endParse = this.parseTime(this.data.end)
    }

    this.add24HoursFormat(this.data)
    this.setDuration()
    this.setShowTimeToChoose()
    this.setPosition()
  }

  showCaledarWidget(e: any) {
    this.timeShowEl?.classList.remove('active-time-change')
    this.showTimeToChoose = false
    if (!this.bodyEl) {
      this.bodyEl = e.target.closest('.body')
    }
    this.bodyEl.style.overflow = 'hidden'
    e.target.classList.add('active-time-change')
    setTimeout(() => {
      this.showCalendar = true
    }, 300);

    this.utilsService.getCurrDate$.pipe(
      skip(1)
    ).subscribe(_ => {
      this.showCalendar = false
      e.target.classList.remove('active-time-change')
    })
  }

  openPicker() {
    this.isOpenPicker = true
  }

  setColor(color: string) {
    this.data.color = color
    this.isOpenPicker = false
  }

  setEventInfo() {
    this.setEvent.emit()
  }

  setPosition() {
    this.data.format24Start = this.data.startParse.format == 'PM' ? this.data.startParse.hour + 12 : this.data.startParse.hour
    let topPos = (DATE_CELL_HEIGHT * this.data.format24Start) + this.data.startParse.min
    this.data.top = topPos
    this.setPos.emit()
  }

  setDuration() {
    let minutes = (this.data.format24End - this.data.format24Start) * DATE_CELL_HEIGHT
    minutes -= this.data.startParse.min
    minutes += this.data.endParse.min
    this.data.duration = minutes
  }

  convertToSeconds(hours: number, min: number): number {
    return (hours * 60) + min
  }

  add24HoursFormat(data: any) {
    data.format24Start = data.startParse.format == 'PM' ? data.startParse.hour + 12 : data.startParse.hour
    data.format24End = data.endParse.format == 'PM' ? data.endParse.hour + 12 : data.endParse.hour
  }

  parseTime(time: string) {
    let [h, min] = time.split(':')
    let [m, format] = min.split(' ')
    return {
      hour: Number(h),
      min: Number(m),
      format
    }
  }

  saveEvent() {
    this.calendarService.setEvent(this.data.createdBy, this.data)
    this.closeDialog.emit()
    delete this.data
    setTimeout(() => {
      alert('Event savesd!')
    }, 100);

  }

  ngOnDestroy() {
    this.subcr.unsubscribe()
  }

}
