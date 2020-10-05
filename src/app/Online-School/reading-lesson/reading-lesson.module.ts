import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadingLessonPageRoutingModule } from './reading-lesson-routing.module';

import { ReadingLessonPage } from './reading-lesson.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadingLessonPageRoutingModule,
    SharedModule
  ],
  declarations: [ReadingLessonPage],
})
export class ReadingLessonPageModule {}
