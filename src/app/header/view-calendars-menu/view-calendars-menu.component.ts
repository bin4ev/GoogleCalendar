import {Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-calendars-menu',
  templateUrl: './view-calendars-menu.component.html',
  styleUrls: ['./view-calendars-menu.component.scss']
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
