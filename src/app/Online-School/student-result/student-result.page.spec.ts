import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentResultPage } from './student-result.page';

describe('StudentResultPage', () => {
  let component: StudentResultPage;
  let fixture: ComponentFixture<StudentResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
