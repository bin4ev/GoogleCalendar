import {ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Event } from './events';
import { faAngleDown, faAnglesUp, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from './utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('aside') aside!: ElementRef
  @ViewChild('input') input!: ElementRef

  iconDown = faAngleDown
  iconUp = faAngleUp

  activeComponent!: any
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
