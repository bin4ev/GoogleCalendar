import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faAngleRight, faAngleLeft, faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';
import { UtilsService } from '../../utils.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent  {
  @Output() next = new EventEmitter()
  @Output() openAside = new EventEmitter()

  iconLeft = faAngleLeft
  iconRight = faAngleRight
  iconDown = faAngleDown
  iconSearch = faSearch

  searchMode = false
  currDate: Date = new Date()
  title!: string
  currViewPath!: any

  constructor(private utilService: UtilsService, private router: Router,) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(path => this.currViewPath = path)

    this.utilService.getCurrDate$.subscribe(d => {
      this.currDate = d
      this.setTitle()
    })
  }

  ngOnInit() {
    this.setTitle()
  }

  navigateMonth(e: any) {
    if (e.currentTarget.firstElementChild.id == 'previous') {
      this.setPreviousMonth()
    } else {
      this.setNextMonth()
    }

    this.utilService.setCurrDate(this.currDate)
  }

  setPreviousMonth() {
    this.currDate.setMonth(this.currDate.getMonth() - 1);
    this.setTitle()
  }

  setNextMonth() {
    this.currDate.setMonth(this.currDate.getMonth() + 1) % 12 + 1;
    this.setTitle()
  }

  navigateWeek(e: any) {
    let days = e.currentTarget.firstElementChild.id == 'previous' ? -7 : 7
    this.currDate.setDate(this.currDate.getDate() + days)
    this.setTitle()
    this.utilService.setCurrDate(this.currDate)
  }

  setTitle() {
    let currMonth = this.currDate.toLocaleString('default', { month: 'long' });
    this.title = currMonth + ' ' + this.currDate.getFullYear()
  }

  navigate(e: any) {
    switch (this.currViewPath.url) {
      case '/month':
        this.navigateMonth(e)
        break;
      case '/day':
        'fnDay'
        break;
      case '/week':
        this.navigateWeek(e)
        break;
      default:
        break;
    }
  }



}
