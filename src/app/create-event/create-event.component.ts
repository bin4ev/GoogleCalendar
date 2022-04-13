import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faCalendarDay, faClockFour, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { pipe, skip } from 'rxjs';
import { UtilsService } from '../utils.service';

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

  time = [
    { id: 0, time: '1:00 AM' },
    { id: 2, time: '2:00 AM' },
    { id: 3, time: '3:00 AM' },
    { id: 4, time: '4:00 AM' },
    { id: 5, time: '5:00 AM' },
    { id: 6, time: '6:00 AM' },
    { id: 7, time: '7:00 AM' },
    { id: 8, time: '8:00 AM' },
    { id: 9, time: '9:00 AM' },
    { id: 10, time: '10:00 AM' },
    { id: 11, time: '11:00 AM' },
    { id: 12, time: '12:00 AM' },
    { id: 13, time: '1:00 PM' },
    { id: 14, time: '2:00 PM' },
    { id: 15, time: '3:00 PM' },
    { id: 16, time: '4:00 PM' },
    { id: 17, time: '5:00 PM' },
    { id: 18, time: '6:00 PM' },
    { id: 19, time: '7:00 PM' },
    { id: 20, time: '8:00 PM', },
    { id: 21, time: '9:00 PM' },
    { id: 22, time: '10:00 PM' },
    { id: 23, time: '11:00 PM' }]

  iconClock = faClockFour
  calendarIcon = faCalendarDay
  arrowDown = faSortDown

  currDate!: Date
  dayOfWeek!: any
  currMonth!: any
  event!: Event
  showTimeToChoose = false
  timeShowEl!: HTMLElement
  showCalendar = false
  bodyEl!: HTMLElement
  isOpenPicker = false

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.utilsService.getCurrDate$.subscribe(d => {
      this.currDate = d
      this.dayOfWeek = this.currDate.toLocaleString('en-us', { weekday: 'long' })
      this.currMonth = this.currDate.toLocaleString('default', { month: 'long' })
      this.data.date = `${d.getDate()}/${d.getMonth() + 1}`
    })

  }

  ngAfterViewInit() {
    this.inputEl.nativeElement.focus()
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
    if (this.timeShowEl.classList.contains('start-time')) {
      this.data.start = e.target.textContent
      return
    }

    this.data.end = e.target.textContent
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


}
