import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherOverviewPage } from './teacher-overview.page';

describe('TeacherOverviewPage', () => {
  let component: TeacherOverviewPage;
  let fixture: ComponentFixture<TeacherOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherOverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
