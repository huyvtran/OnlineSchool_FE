import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeningLessonPage } from './listening-lesson.page';

describe('ListeningLessonPage', () => {
  let component: ListeningLessonPage;
  let fixture: ComponentFixture<ListeningLessonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningLessonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeningLessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
