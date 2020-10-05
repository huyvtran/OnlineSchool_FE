import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeningLessonPageRoutingModule } from './listening-lesson-routing.module';

import { ListeningLessonPage } from './listening-lesson.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeningLessonPageRoutingModule,
    SharedModule
  ],
  declarations: [ListeningLessonPage]
})
export class ListeningLessonPageModule {}
