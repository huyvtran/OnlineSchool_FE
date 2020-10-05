import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentAssignmentlistPage } from './student-assignmentlist.page';

const routes: Routes = [
  {
    path: '',
    component: StudentAssignmentlistPage
  },
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module')
    .then( m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentAssignmentlistPageRoutingModule {}
