import { Component,ViewChild, EventEmitter, Input, OnInit, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() userInfo!: { email: string, icon: string, name?: string }

  @Output() mouseOver = new EventEmitter()


  constructor() { }

  ngOnInit(): void {
  }

  onMouseOver() {
    this.mouseOver.emit()
  }

 

}
