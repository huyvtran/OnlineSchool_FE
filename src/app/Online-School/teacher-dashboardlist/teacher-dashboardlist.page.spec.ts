import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherDashboardlistPage } from './teacher-dashboardlist.page';

describe('TeacherDashboardlistPage', () => {
  let component: TeacherDashboardlistPage;
  let fixture: ComponentFixture<TeacherDashboardlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherDashboardlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherDashboardlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
