import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentDashboardlistPage } from './student-dashboardlist.page';

const routes: Routes = [
  {
    path: '',
    component: StudentDashboardlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDashboardlistPageRoutingModule {}
