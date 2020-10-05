import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherDoubtPage } from './teacher-doubt.page';

describe('TeacherDoubtPage', () => {
  let component: TeacherDoubtPage;
  let fixture: ComponentFixture<TeacherDoubtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherDoubtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherDoubtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
