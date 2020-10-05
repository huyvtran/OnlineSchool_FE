import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenPdfPage } from './open-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: OpenPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenPdfPageRoutingModule {}
