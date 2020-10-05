import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnswerQuestionPageRoutingModule } from './answer-question-routing.module';

import { AnswerQuestionPage } from './answer-question.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnswerQuestionPageRoutingModule,
    SharedModule
  ],
  declarations: [AnswerQuestionPage]
})
export class AnswerQuestionPageModule {}
