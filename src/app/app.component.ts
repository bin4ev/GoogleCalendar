import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';
import { Event } from './events';
import { WidgetCalendarComponent } from './widget-calendar/widget-calendar.component';
import { faAngleDown, faAnglesUp, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from './utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(WidgetCalendarComponent) widgetCalendarComponent!: WidgetCalendarComponent
  @ViewChild('aside') aside!: ElementRef
  @ViewChild('input') input!: ElementRef

  events: Event[] = [
    {
      name: 'Available',
      start: '12:30 PM',
      date: '10/02'
    },
    {
      name: 'Angular Intern',
      start: '11:00 AM',
      date: '13/02'
    },
    {
      name: 'Angular Intern',
      start: '11:00 AM',
      date: '14/02'
    }
  ]

  iconDown = faAngleDown
  iconUp = faAngleUp

  monthCalendarComponent!: MonthCalendarComponent
  subscription$!: any
  currMonth!: string
  open = false
  showCalendarOn: any = new Set()

  constructor(private utilsService: UtilsService) {
    this.subscription$ = this.utilsService.month$
  }

  onActivate(componentRef: any) {
    if (componentRef instanceof MonthCalendarComponent) {
      this.monthCalendarComponent = componentRef
    }
  }

  onClick(e: any) {
    e.target.checked ? this.showCalendarOn.add(e.target.value) : this.showCalendarOn.delete(e.target.value)
    this.utilsService.setEventToShow(this.showCalendarOn)
  }

  setDate(d: Date) {
    this.monthCalendarComponent.setDateView(d)
  }

  openAside() {
    this.aside.nativeElement.style.width = this.open ? '0px' : '25%'
    this.open = !this.open
  }

  getToday() {
    this.monthCalendarComponent.getTodayView()
    this.widgetCalendarComponent.getTodayView()
  }

  onNext() {
    this.monthCalendarComponent.next()
    this.widgetCalendarComponent.next()
  }

  onPrevious() {
    this.monthCalendarComponent.previous()
    this.widgetCalendarComponent.previous()
  }

  showDropdownMenu(e: any) {
    if (e.target.nextSibling.style.display == 'block') {
      e.target.nextSibling.style.display = 'none'
    } else {
      e.target.nextSibling.style.display = 'block'
    }
  }

}
