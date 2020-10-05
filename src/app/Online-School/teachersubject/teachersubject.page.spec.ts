import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeachersubjectPage } from './teachersubject.page';

describe('TeachersubjectPage', () => {
  let component: TeachersubjectPage;
  let fixture: ComponentFixture<TeachersubjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersubjectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeachersubjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
