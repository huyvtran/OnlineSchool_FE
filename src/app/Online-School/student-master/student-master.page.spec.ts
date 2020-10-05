import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentMasterPage } from './student-master.page';

describe('StudentMasterPage', () => {
  let component: StudentMasterPage;
  let fixture: ComponentFixture<StudentMasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMasterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
