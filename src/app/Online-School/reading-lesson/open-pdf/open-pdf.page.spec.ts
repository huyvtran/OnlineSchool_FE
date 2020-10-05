import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenPdfPage } from './open-pdf.page';

describe('OpenPdfPage', () => {
  let component: OpenPdfPage;
  let fixture: ComponentFixture<OpenPdfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenPdfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenPdfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
