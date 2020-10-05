import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideosListPageRoutingModule } from './videos-list-routing.module';

import { VideosListPage } from './videos-list.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideosListPageRoutingModule,
    SharedModule
  ],
  declarations: [VideosListPage]
})
export class VideosListPageModule {}
