import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentAssignmentPage } from './student-assignment.page';

const routes: Routes = [
  {
    path: '',
    component: StudentAssignmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentAssignmentPageRoutingModule {}
