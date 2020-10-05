import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentDashboardlistPage } from './student-dashboardlist.page';

describe('StudentDashboardlistPage', () => {
  let component: StudentDashboardlistPage;
  let fixture: ComponentFixture<StudentDashboardlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDashboardlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDashboardlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
