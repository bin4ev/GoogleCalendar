import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faAngleRight, faAngleLeft, faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() month!: any

  @Output() previous = new EventEmitter()
  @Output() next = new EventEmitter()
  @Output() getToday = new EventEmitter()
  @Output() openAside = new EventEmitter()

  iconLeft = faAngleLeft
  iconRight = faAngleRight
  iconDown = faAngleDown
  iconSearch = faSearch

  searchMode = false
  items: any = [
    { name: 'Day', shortcut: 'D', path: 'day' },
    { name: 'Month', shortcut: 'M', path: 'month' },
    { name: 'Week', shortcut: 'W', path: 'week' }
  ]

  toggleSearchMode() {
    this.searchMode = !this.searchMode
  }

}
