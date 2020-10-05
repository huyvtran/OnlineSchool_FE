import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentmasterCurriculumPage } from './studentmaster-curriculum.page';

describe('StudentmasterCurriculumPage', () => {
  let component: StudentmasterCurriculumPage;
  let fixture: ComponentFixture<StudentmasterCurriculumPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentmasterCurriculumPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentmasterCurriculumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
