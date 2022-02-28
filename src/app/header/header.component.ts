import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faAngleRight, faAngleLeft, faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';
import { UtilsService } from '../utils.service';
import { filter } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() next = new EventEmitter()
  @Output() openAside = new EventEmitter()

  iconLeft = faAngleLeft
  iconRight = faAngleRight
  iconDown = faAngleDown
  iconSearch = faSearch

  searchMode = false
  currDate: Date = new Date()
  showCalendarWidget = true
  items: any = [
    { name: 'Day', shortcut: 'D', path: 'day' },
    { name: 'Month', shortcut: 'M', path: 'month' },
    { name: 'Week', shortcut: 'W', path: 'week' }
  ]

  constructor(private utilService: UtilsService, private router: Router,) { }

  toggleSearchMode() {
    this.searchMode = !this.searchMode
  }

  getToday() {
    this.currDate = new Date()
    this.utilService.setCurrDate(this.currDate)
  }

  openAsideMenu(){
    this.openAside.emit()
    this.showCalendarWidget = !this.showCalendarWidget
  }
}
