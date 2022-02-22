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

  activeComponent!: any
  monthCalendarComponent!: MonthCalendarComponent
  open = false
  showCalendarOn: any = new Set()

  constructor(private utilsService: UtilsService) {
  
  }

  onClick(e: any) {
    e.target.checked ? this.showCalendarOn.add(e.target.value) : this.showCalendarOn.delete(e.target.value)
    this.utilsService.setEventToShow(this.showCalendarOn)
  }

  setDate(d: Date) {
    this.utilsService.setCurrDate(d)
  }

  openAside() {
    this.aside.nativeElement.style.width = this.open ? '0px' : '25%'
    setTimeout(() => {
      this.aside.nativeElement.style.overflowX = this.open ? 'visible' : 'hidden'
    }, 100);

    this.open = !this.open
  }

  showDropdownMenu(e: any) {
    if (e.target.nextSibling.style.display == 'block') {
      e.target.nextSibling.style.display = 'none'
    } else {
      e.target.nextSibling.style.display = 'block'
    }
  }

}
