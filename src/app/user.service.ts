import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  backendDemoUSers = [
    {
      email: 'stamat@gmail.com',
      name: 'Stamat Ivanov',
      icon: 'boy',
      color:'green'
    },
    {
      email: 'dimitar@gmail.com',
      name: 'Dimitar Dimitrov',
      icon: 'girl',
      color: 'red'
    },
    {
      email: 'gosho@gmail.com',
      name: 'Gosho Goshev',
      icon: 'grandparents',
      color: 'blue'
    },
    {
      email: 'gero@gmail.com',
      name: 'Gero Gerov',
      icon: 'man',
      color: 'pink'

    }
  ]

  constructor() { }

  getLoggedUserInfo() {
    return  {
      email: 'dragan@gmail.com',
      name: 'Dragan Gerov',
      icon: 'man',
      color: 'red'
    }
  }

  getUserInfo(email: string) {
    let userInfo = this.backendDemoUSers.find(x => x.email == email)
    return userInfo ? userInfo : `There is no User with email:  ${email}`
  }
}
