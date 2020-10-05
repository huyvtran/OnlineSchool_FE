import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherMasterPage } from './teacher-master.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherMasterPageRoutingModule {}
