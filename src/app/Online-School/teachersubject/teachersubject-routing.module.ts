import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeachersubjectPage } from './teachersubject.page';

const routes: Routes = [
  {
    path: '',
    component: TeachersubjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersubjectPageRoutingModule {}
