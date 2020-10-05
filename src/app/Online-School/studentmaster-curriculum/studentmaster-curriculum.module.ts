import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentmasterCurriculumPageRoutingModule } from './studentmaster-curriculum-routing.module';

import { StudentmasterCurriculumPage } from './studentmaster-curriculum.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentmasterCurriculumPageRoutingModule,
    SharedModule
  ],
  declarations: [StudentmasterCurriculumPage]
})
export class StudentmasterCurriculumPageModule {}
