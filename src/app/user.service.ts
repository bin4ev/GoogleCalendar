import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  backendDemoUSers = [
    {
      email: 'stamat@gmail.com',
      name: 'Stamat Ivanov',
      icon:'boy' 
    },
    {
      email: 'dimitar@gmail.com',
      name: 'Dimitar Dimitrov',
      icon: 'girl'
    },
    {
      email: 'gosho@gmail.com',
      name: 'Gosho Goshev',
      icon: 'grandparents'
    },
    {
      email: 'gero@gmail.com',
      name: 'Gero Gerov',
      icon: 'man'
    }
  ]
  constructor() { }

  getUserInfo(email: string) {
    let userInfo = this.backendDemoUSers.find(x => x.email == email)
    return userInfo? userInfo : `There is no User with email:  ${email}`
}
}
