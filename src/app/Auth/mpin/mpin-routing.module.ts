import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MpinPage } from './mpin.page';

const routes: Routes = [
  {
    path: '',
    component: MpinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MpinPageRoutingModule {}
