import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherMasterPage } from './teacher-master.page';

describe('TeacherMasterPage', () => {
  let component: TeacherMasterPage;
  let fixture: ComponentFixture<TeacherMasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMasterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
