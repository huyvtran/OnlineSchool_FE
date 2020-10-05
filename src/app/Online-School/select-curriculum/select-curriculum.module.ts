import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCurriculumPageRoutingModule } from './select-curriculum-routing.module';

import { SelectCurriculumPage } from './select-curriculum.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCurriculumPageRoutingModule,
    SharedModule
  ],
  declarations: [SelectCurriculumPage]
})
export class SelectCurriculumPageModule {}
