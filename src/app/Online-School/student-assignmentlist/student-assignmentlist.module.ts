import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentAssignmentlistPageRoutingModule } from './student-assignmentlist-routing.module';

import { StudentAssignmentlistPage } from './student-assignmentlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentAssignmentlistPageRoutingModule
  ],
  declarations: [StudentAssignmentlistPage]
})
export class StudentAssignmentlistPageModule {}
