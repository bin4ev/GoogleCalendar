import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  
  private setShowCalendar = new BehaviorSubject(new Set());
  private setDateSource = new BehaviorSubject( new Date())

data$ = this.setShowCalendar.asObservable()
getCurrDate$ = this.setDateSource.asObservable()

constructor() { }

setEventToShow(d: Set<string>) {
  this.setShowCalendar.next(d)
}

  setCurrDate(d: Date) {
  this.setDateSource.next(d)
}

}
