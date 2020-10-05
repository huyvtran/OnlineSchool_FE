import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MpinPage } from './mpin.page';

describe('MpinPage', () => {
  let component: MpinPage;
  let fixture: ComponentFixture<MpinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MpinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
