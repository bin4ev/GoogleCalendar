import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-calendars-menu',
  templateUrl: './view-calendars-menu.component.html',
  styleUrls: ['./view-calendars-menu.component.scss'],
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({width: '0%',
          top:' 25px',
          height:' 0px'}),
        animate('101ms'),
      ])
    ]),
  ]
})
export class ViewCalendarsMenuComponent {
  @ViewChild('section') dropdownEl!: ElementRef
  @Input() items: any = []

  iconDown = faAngleDown

  showMenuButton = false
  currView = 'Month'

  changeState(currState: string) {
    this.currView = currState
    this.toggleMenuBtn()
  }

  toggleMenuBtn() {
    this.showMenuButton = !this.showMenuButton
  }
}
