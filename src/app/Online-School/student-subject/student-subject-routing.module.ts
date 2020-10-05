import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentSubjectPage } from './student-subject.page';

const routes: Routes = [
  {
    path: '',
    component: StudentSubjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentSubjectPageRoutingModule {}
