import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentMasterPage } from './student-master.page';

const routes: Routes = [
  {
    path: '',
    component: StudentMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentMasterPageRoutingModule {}
