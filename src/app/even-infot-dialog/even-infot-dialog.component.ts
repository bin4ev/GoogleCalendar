import { ChangeDetectorRef, Component, ComponentRef, ContentChild, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { faAngleDown, faAngleUp, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-even-infot-dialog',
  templateUrl: './even-infot-dialog.component.html',
  styleUrls: ['./even-infot-dialog.component.scss']
})
export class EvenInfotDialogComponent {
  @ViewChild('dialog') dialog!: ElementRef
  @ViewChild('userInfoComp') userInfoRef?: ElementRef

  @Input() set info(value: any) {
    this.data = value
    this.setPresence()
    this.getUserInfo()

  }

  @Output() closeDialog = new EventEmitter()

  iconDown = faAngleDown
  iconUp = faAngleUp
  calendarIcon = faCalendarDay
  
  data!: any
  removeOnClick!: any
  totalGuests = 0
  presenceInfo = {
    yes: 0,
    no: 0,
    awaiting: 0
  }
  showDinamicFooter = false
  usersInfo: any = []
  timeOut!: any
  showUserInfo = false
  indexChoosenUser!: number

  constructor(private renderer: Renderer2,
    private userService: UserService,
    private changeDet: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.removeOnClick = this.renderer.listen('body', 'click', this.documentClick.bind(this))
  }


  getUserInfo() {
    for (let g of this.data.guests) {
      let user = this.userService.getUserInfo(g.email)
      this.usersInfo.push(user)
    }
  }

  setPresence() {
    for (let g of this.data.guests) {
      this.totalGuests++
      switch (g.going) {
        case true:
          this.presenceInfo.yes++
          break;
        case false:
          this.presenceInfo.no++
          break;
        default:
          this.presenceInfo.awaiting++
          break;
      }
    }
  }

  documentClick() {
    this.close()
  }

  stopPropagate(e: any) {
    e.stopPropagation()
  }

  close() {
    this.closeDialog.emit()
    this.data = null
    this.totalGuests = 0
  }

  toggledDinamicFooter(e: any) {
    this.showDinamicFooter = !this.showDinamicFooter
  }

  showUser(index: number, e?: any,) {
    this.changeDet.detectChanges()
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }

    this.timeOut = setTimeout(() => {
      this.showUserInfo = true
      this.indexChoosenUser = index
      if (e) {
        this.changeDet.detectChanges()
        let offSet = e.clientX - this.dialog?.nativeElement.getBoundingClientRect().x
        this.userInfoRef!.nativeElement.style.top =  e.clientY  + 'px'
        this.userInfoRef!.nativeElement.style.left = offSet + 15  + 'px'
      }
    }, 500);
  }

  closeUserInfo(e: any) {
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }

    this.timeOut = setTimeout(() => {
      this.showUserInfo = true
      this.indexChoosenUser = -1
    }, 500);

  }

  ngOnDestroy() {
    this.removeOnClick()
  }
}