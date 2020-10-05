import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingLessonPage } from './reading-lesson.page';

describe('ReadingLessonPage', () => {
  let component: ReadingLessonPage;
  let fixture: ComponentFixture<ReadingLessonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingLessonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingLessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
