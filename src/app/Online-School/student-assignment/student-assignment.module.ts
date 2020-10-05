import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentAssignmentPageRoutingModule } from './student-assignment-routing.module';

import { StudentAssignmentPage } from './student-assignment.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentAssignmentPageRoutingModule,
    SharedModule
  ],
  declarations: [StudentAssignmentPage]
})
export class StudentAssignmentPageModule {}
