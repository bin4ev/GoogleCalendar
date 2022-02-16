import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private setShowCalendar = new Subject<Set<string>>();
  private currMonthSource = new Subject<any>()

  data$ = this.setShowCalendar.asObservable()
  month$ = this.currMonthSource.asObservable()

  constructor() { }

  setEventToShow(d: Set<string>) {
    this.setShowCalendar.next(d)
  }

  getCurrMonth(month: any) {
    this.currMonthSource.next(month)
  }

}
