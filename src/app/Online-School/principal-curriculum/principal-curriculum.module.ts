import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalCurriculumPageRoutingModule } from './principal-curriculum-routing.module';

import { PrincipalCurriculumPage } from './principal-curriculum.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalCurriculumPageRoutingModule,
    SharedModule
  ],
  declarations: [PrincipalCurriculumPage]
})
export class PrincipalCurriculumPageModule {}
