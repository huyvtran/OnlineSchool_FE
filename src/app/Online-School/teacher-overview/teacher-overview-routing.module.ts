import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherOverviewPage } from './teacher-overview.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherOverviewPageRoutingModule {}
