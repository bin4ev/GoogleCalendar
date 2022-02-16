import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  API_KEY = "fb4a7af6f9494b5ca0f80e62a72a331e"
  URL = `https://holidays.abstractapi.com/v1/`

  holidays: any = []
  allEvents: any = {
    Ivan: [
      {
        name: 'Busy',
        start: '12:30 PM',
        date: '10/02',
        color: 'red'
      },
      {
        name: 'Dinner',
        start: '10:30 PM',
        date: '11/02',
        color: 'red'
      },
      {
        name: 'meeting Bussines',
        start: '11:00 AM',
        date: '13/03',
        color: 'red'
      },
      {
        name: 'Dentis ',
        start: '11:00 AM',
        date: '14/04',
        color: 'red'
      }
    ],
    Dragan: [
      {
        name: 'Available',
        start: '12:30 PM',
        date: '10/02',
        color: 'green'
      },
      {
        name: 'Available',
        start: '14:30 PM',
        date: '11/02',
        color: 'green'
      },
      {
        name: 'Doctor ',
        start: '11:00 AM',
        date: '13/03',
        color: 'green'
      },
      {
        name: 'JavaScript Course',
        start: '11:00 AM',
        date: '14/04',
        color: 'green'
      }
    ],

    Holidays: this.holidays
  }

  constructor() {
    fetch('https://date.nager.at/api/v2/PublicHolidays/2022/BG')
      .then(res => res.json())
      .then(d => this.holidays = d)
      .catch((err) => console.error(err))
  }

  getEventForsMonth(year: any, month: any) {
    let res: any = {}
    for (let [key, value] of <Array<any>>Object.entries(this.allEvents)) {
      month = String(month).padStart(2, '0')
      if (key != 'Holidays') {
        let filtered = value.filter((x: any) => x.date.endsWith(month))
        res[key] = filtered
        continue
      }

      res[key] = this.holidays.filter((d: any) => {
        let [, m] = d.date.split('-')
        m == month
      })
    }

    return res
  }
}
