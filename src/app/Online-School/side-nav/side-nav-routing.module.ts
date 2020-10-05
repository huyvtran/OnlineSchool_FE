import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideNavPage } from './side-nav.page';

const routes: Routes = [
  {
    path: '',
    component: SideNavPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideNavPageRoutingModule {}
