import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonsPage } from './lessons.page';

const routes: Routes = [
  {
    path: '',
    component: LessonsPage
  },
  {
    path: 'raising-doubt',
    loadChildren: () => import('../raising-doubt/raising-doubt.module')
    .then( m => m.RaisingDoubtPageModule)
  },
  {
    path: 'listening-lesson',
    loadChildren: () => import('../listening-lesson/listening-lesson.module')
    .then( m => m.ListeningLessonPageModule)
  },
  {
    path: 'reading-lesson',
    loadChildren: () => import('../reading-lesson/reading-lesson.module')
    .then(m => m.ReadingLessonPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsPageRoutingModule {}
