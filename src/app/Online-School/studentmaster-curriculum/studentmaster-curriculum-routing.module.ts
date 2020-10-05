import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentmasterCurriculumPage } from './studentmaster-curriculum.page';

const routes: Routes = [
  {
    path: '',
    component: StudentmasterCurriculumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentmasterCurriculumPageRoutingModule {}
