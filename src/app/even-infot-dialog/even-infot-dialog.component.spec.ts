import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenInfotDialogComponent } from './even-infot-dialog.component';

describe('EvenInfotDialogComponent', () => {
  let component: EvenInfotDialogComponent;
  let fixture: ComponentFixture<EvenInfotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenInfotDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenInfotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
