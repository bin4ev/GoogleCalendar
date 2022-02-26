import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { faAngleRight, faAngleLeft, faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { UtilsService } from '../../utils.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
   animations:[
     trigger('showHide',[
      transition(':enter',[
        style({ width:'0px',
                height:'0px',
                top:'120px',
                left:'520px'
              }),
        animate('0.13s',
        style({ width: '250px',
                height:'250px',
                top:'20px',
                left:'410px'
              }))
      ]),
      transition(':leave',[
        animate('0.13s',
         style({ width:'0px',
                 left:'520px',
                 top:'120px',
                 height:'0px',
      }))
      ])
     ])
  ]
})
export class NavigatorComponent {
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
  showWidget = false
  removeOnClick!: any

  constructor(private utilService: UtilsService,
    private router: Router,
    private render: Renderer2) {
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
    this.removeOnClick = this.render.listen('document', 'mousedown',() => this.showWidget = false)
  }

  showCalendar() {
    this.showWidget = !this.showWidget
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
    let currYear = this.currDate.getFullYear()
    let lastSundayDate = this.getLastSunday()
    if (this.currDate.getDate() != lastSundayDate.getDate()) {
      this.title = `${currMonth} ${currYear}`
      return
    }

    let nextMonthDate = new Date(currYear, this.currDate.getMonth() + 1, 1);
    let nextMonth = nextMonthDate.toLocaleString('default', { month: 'long' })
    this.title = `${currMonth}-${nextMonth} ${currYear}`
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

  getLastSunday() {
    let d = new Date(this.currDate.getFullYear(), this.currDate.getMonth() + 1, 0);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }
}
