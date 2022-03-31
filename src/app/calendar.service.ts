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
        id: '1',
        name: 'Busy',
        start: '7:00 AM',
        end: '7:30 AM',
        date: '27/03',
        color: 'red',
        createdBy: 'Stamat Ivanow',
        guests: [
          {
            name: 'Stamat Ivanov',
            email: ' stamat@gmail.com',
            going: true
          },
          {
            name: 'Dimitar Dimitrov',
            email: ' dimitar@gmail.com',
            going: false
          },
          {
            name: 'Gosho Goshev',
            email: ' gosho@gmail.com',
            going: undefined
          },
          {
            name: 'Gero Gerov',
            email: ' gero@gmail.com',
            going: undefined
          },
        ]
      },
      {
        id: '0',
        name: 'Meet with Ivan',
        start: '8:20 AM',
        end: '12:20 AM',
        date: '27/03',
        color: 'red',
        createdBy: 'Ivaylo Ivaylov',
        guests: [
          {
            name: 'Stamat Ivanov',
            email: ' stamat@gmail.com',
            going: true
          },
          {
            name: 'Dimitar Dimitrov',
            email: ' dimitar@gmail.com',
            going: true
          },
          {
            name: 'Gosho Goshev',
            email: ' gosho@gmail.com',
            going: true
          },
        ]
      },
      {
        id: '2',
        name: 'Dinner',
        start: '3:20 AM',
        end: '6:00 AM',
        date: '27/03',
        color: 'red',
        createdBy: 'Ivaylo Ivaylov',
        guests: [
          {
            name: 'Stamat Ivanov',
            email: ' stamat@gmail.com',
            going: false
          },
          {
            name: 'Dimitar Dimitrov',
            email: ' dimitar@gmail.com',
            going: false
          },
          {
            name: 'Gosho Goshev',
            email: ' gosho@gmail.com',
            going: false
          },
        ]
      },
      {
        id: '3',
        name: 'Meeting Bussines',
        start: '3:10 AM',
        end: '5:30 AM',
        date: '27/03',
        color: 'red',
        createdBy: 'Ivaylo Ivaylov',
        guests: [
          {
            name: 'Stamat Ivanov',
            email: ' stamat@gmail.com',
            going: true
          },
          {
            name: 'Dimitar Dimitrov',
            email: ' dimitar@gmail.com',
            going: undefined
          },
          {
            name: 'Gosho Goshev',
            email: ' gosho@gmail.com',
            going: undefined
          },
        ]
      },
      {
        id: '4',
        name: 'Dentis ',
        start: '3:20 AM',
        end: '4:15 PM',
        date: '27/03',
        color: 'red',
        createdBy: 'Ivaylo Ivaylov',
        guests: [
          {
            name: 'Stamat Ivanov',
            email: ' stamat@gmail.com',
            going: false
          },
          {
            name: 'Dimitar Dimitrov',
            email: ' dimitar@gmail.com',
            going: false
          },
          {
            name: 'Gosho Goshev',
            email: ' gosho@gmail.com',
            going: undefined
          },
        ]
      }
    ],
    Stamat: [
      {
        id: '8',
        name: 'Interview',
        start: '3:10 AM',
        end: '9:30 AM',
        date: '27/03',
        color: 'blue',
        createdBy: 'Ivaylo Ivaylov',
        guests: [
          {
            name: 'Stamat Ivanov',
            email: 'stamat@gmail.com',
            going: undefined
          },
          {
            name: 'Dimitar Dimitrov',
            email: 'dimitar@gmail.com',
            going: undefined
          },
          {
            name: 'Gosho Goshev',
            email: 'gosho@gmail.com',
            going: undefined
          },
        ]
      },
      {
        id: '9',
        name: 'Angular intern',
        start: '8:00 AM',
        end: '8:50 AM',
        date: '27/03',
        color: 'blue',
        createdBy: 'Ivaylo Ivaylov',
        guests: [
          {
            name: 'Stamat Ivanov',
            email: 'stamat@gmail.com',
            going: true
          },
          {
            name: 'Dimitar Dimitrov',
            email: 'dimitar@gmail.com',
            going: true
          },
          {
            name: 'Gosho Goshev',
            email: 'gosho@gmail.com',
            going: true
          },
        ]
      },
    ],
    Dragan: [
      {
        id: '6',
        name: 'Doctor ',
        start: '4:50 AM',
        end: '12:00 AM',
        date: '27/03',
        color: 'green',
        createdBy: 'Ivaylo Ivaylov',
        guests: [
          {
            name: 'Stamat Ivanov',
            email: 'stamat@gmail.com',
            going: true
          },
          {
            name: 'Dimitar Dimitrov',
            email: 'dimitar@gmail.com',
            going: true
          },
          {
            name: 'Gosho Goshev',
            email: 'gosho@gmail.com',
            going: undefined
          },
        ]
      },
      {
        id: '7',
        name: 'JavaScript Course',
        start: '6:00 PM',
        end: '8:50 PM',
        date: '27/03',
        color: 'green',
        createdBy: 'Ivaylo Ivaylov',
        guests: [
          {
            name: 'Stamat Ivanov',
            email: 'stamat@gmail.com',
            going: true
          },
          {
            name: 'Dimitar Dimitrov',
            email: 'dimitar@gmail.com',
            going: false
          },
          {
            name: 'Gosho Goshev',
            email: 'gosho@gmail.com',
            going: undefined
          },
        ]
      }
    ],
    holidays: []
  }



  constructor() {
    fetch('https://date.nager.at/api/v2/PublicHolidays/2022/BG')
      .then(res => res.json())
      .then(d => this.holidays = d)
      .catch((err) => console.error(err))
  }

  getEvents(names: any, month: any, start: any, end: any) {
    let filtered = []
    for (let [key, value] of <Array<any>>Object.entries(this.allEvents)) {
      month = String(month).padStart(2, '0')
      if (names?.has(key)) {
        for (let el of value) {
          let [d, m] = el.date.split('/')
          if (m == month && start <= Number(d) && end >= (d)) {
            let obj = { ...el }
            obj.startParse = this.parseTime(el.start)
            obj.endParse = this.parseTime(el.end)
            obj.date = Number(d)
            filtered.push(obj)
          }
        }
      }
    }
    return filtered
  }

  getEventsForToday(names: any, date: Date) {
    let filtered = []
    for (let [key, value] of <Array<any>>Object.entries(this.allEvents)) {
      let day = String(date.getDate()).padStart(2, '0')
      if (names?.has(key)) {
        for (let el of value) {
          let [d, m] = el.date.split('/')
          if (m == date.getMonth() + 1 && day == d) {
            let obj = { ...el }
            obj.startParse = this.parseTime(el.start)
            obj.endParse = this.parseTime(el.end)
            obj.date = Number(d)
            filtered.push(obj)
          }
        }
      }
    }
    return filtered
  }

  private parseTime(time: string) {
    let [h, min] = time.split(':')
    let [m, format] = min.split(' ')
    return {
      hour: Number(h),
      min: Number(m),
      format
    }
  }
}
