import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalCurriculumPage } from './principal-curriculum.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalCurriculumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalCurriculumPageRoutingModule {}
