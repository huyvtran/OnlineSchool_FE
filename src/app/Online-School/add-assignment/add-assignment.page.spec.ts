import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAssignmentPage } from './add-assignment.page';

describe('AddAssignmentPage', () => {
  let component: AddAssignmentPage;
  let fixture: ComponentFixture<AddAssignmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssignmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAssignmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
