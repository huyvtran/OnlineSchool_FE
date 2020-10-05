import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenPdfPageRoutingModule } from './open-pdf-routing.module';

import { OpenPdfPage } from './open-pdf.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenPdfPageRoutingModule,
    PdfViewerModule
  ],
  declarations: [OpenPdfPage],
})
export class OpenPdfPageModule {}
