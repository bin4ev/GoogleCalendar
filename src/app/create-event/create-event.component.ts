import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faClockFour } from '@fortawesome/free-solid-svg-icons';
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

  currDate!: Date
  dayOfWeek!: any
  currMonth!: any
  event!: Event
  showTimeToChoose = false
  timeShowEl!: HTMLElement
  showCalendar = false
  bodyEl!: HTMLElement

  constructor(private utilsServic: UtilsService) { }

  ngOnInit(): void {
    this.utilsServic.getCurrDate$.subscribe(d => {
      this.currDate = d
      this.dayOfWeek = this.currDate.toLocaleString('en-us', { weekday: 'long' })
      this.currMonth = this.currDate.toLocaleString('default', { month: 'long' })
    })

  }

  ngAfterViewInit() {
    this.inputEl.nativeElement.focus()

  }

  close() {
    this.closeDialog.emit()
  }

  showTimes(e: any) {
    if (!this.bodyEl) {
      this.bodyEl = e.target.closest('.body')
    }
    this.timeShowEl = e.target
    this.showTimeToChoose = true
    this.bodyEl.style.overflow = 'hidden'
  }

  closeTimes(e: any) {
    this.showTimeToChoose = false
    this.bodyEl.style.overflow = 'auto'
    if (this.timeShowEl.classList.contains('start-time')) {
      this.data.start = e.target.textContent
      return
    }

    this.data.end = e.target.textContent
  }

  showCaledarWidget(e: any) {
    if (!this.bodyEl) {
      this.bodyEl = e.target.closest('.body')
    }
    this.bodyEl.style.overflow = 'hidden'
    this.showCalendar = true
    this.utilsServic.getCurrDate$.pipe(
        skip(1)
      ).subscribe(_ => this.showCalendar = false)
    
  }


}
