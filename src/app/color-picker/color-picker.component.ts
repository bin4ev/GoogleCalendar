import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  @Input() defaultColor?: string //to do

  @Output() sendColor = new EventEmitter()

  colors = ['red', 'blue', 'green', 'pink', 'orange', 'grey', '#4ED786', '#107FFF','#F48542', '#9C5FF4']
  
  constructor() { }

  ngOnInit(): void {
   
    
  }

  chooseColor(color:string){
    this.sendColor.emit(color)
  }


}
