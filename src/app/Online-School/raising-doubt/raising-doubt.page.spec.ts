import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RaisingDoubtPage } from './raising-doubt.page';

describe('RaisingDoubtPage', () => {
  let component: RaisingDoubtPage;
  let fixture: ComponentFixture<RaisingDoubtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisingDoubtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RaisingDoubtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
