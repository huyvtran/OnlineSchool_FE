import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrincipalOverviewPage } from './principal-overview.page';

describe('PrincipalOverviewPage', () => {
  let component: PrincipalOverviewPage;
  let fixture: ComponentFixture<PrincipalOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalOverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrincipalOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
