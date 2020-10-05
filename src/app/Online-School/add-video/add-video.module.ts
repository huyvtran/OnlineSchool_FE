import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVideoPageRoutingModule } from './add-video-routing.module';

import { AddVideoPage } from './add-video.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVideoPageRoutingModule,
    SharedModule
  ],
  declarations: [AddVideoPage]
})
export class AddVideoPageModule {}
