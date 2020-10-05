import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherDoubtPage } from './teacher-doubt.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherDoubtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherDoubtPageRoutingModule {}
