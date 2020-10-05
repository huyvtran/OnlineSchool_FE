import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaisingDoubtPage } from './raising-doubt.page';

const routes: Routes = [
  {
    path: '',
    component: RaisingDoubtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaisingDoubtPageRoutingModule {}
