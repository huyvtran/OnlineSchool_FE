import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideosListPage } from './videos-list.page';

describe('VideosListPage', () => {
  let component: VideosListPage;
  let fixture: ComponentFixture<VideosListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
