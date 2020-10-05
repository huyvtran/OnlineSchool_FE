import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadingLessonPage } from './reading-lesson.page';

const routes: Routes = [
  {
    path: '',
    component: ReadingLessonPage
  },
  {
    path: 'open-pdf',
    loadChildren: () => import('./open-pdf/open-pdf.module').then( m => m.OpenPdfPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingLessonPageRoutingModule {}
