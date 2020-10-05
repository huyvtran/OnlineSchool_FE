import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectCurriculumPage } from './select-curriculum.page';

const routes: Routes = [
  {
    path: '',
    component: SelectCurriculumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectCurriculumPageRoutingModule {}
