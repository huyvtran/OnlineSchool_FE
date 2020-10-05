import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeningLessonPage } from './listening-lesson.page';

const routes: Routes = [
  {
    path: '',
    component: ListeningLessonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeningLessonPageRoutingModule {}
