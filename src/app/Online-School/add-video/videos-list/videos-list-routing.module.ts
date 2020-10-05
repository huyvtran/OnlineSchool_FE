import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideosListPage } from './videos-list.page';

const routes: Routes = [
  {
    path: '',
    component: VideosListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosListPageRoutingModule {}
